#!/usr/bin/env python3
"""
de_emdash.py — Post-processor for humanize skill output.

Replaces em dashes with the punctuation devices a writer actually uses.
Em-dash overuse is one of the strongest AI-detection signals; most human
writers reach for other devices (parentheses, hyphens, hard sentence
breaks) far more often than AI-generated text does.

The replacement devices are configurable so they can be driven by a
voice profile (built with voice-profiler). The defaults reflect a
common human pattern: parentheses for short asides, space-hyphen-space
for longer asides and elaborations, period + new sentence for hard
pivots, and a small number of em dashes kept (humans do use them —
just not as the dominant device).

Usage:
  echo "text" | python3 de_emdash.py
  python3 de_emdash.py input.txt
  python3 de_emdash.py input.txt -o output.txt
  python3 de_emdash.py --max-emdash 2 input.txt    # keep up to 2 em dashes
  python3 de_emdash.py --aside parens --elaboration hyphen input.txt

Configure from a voice profile: set --aside / --elaboration / --pivot /
--max-emdash to match the devices observed in the writer's own samples.
"""

import sys
import re
import random
import argparse

# Em dash patterns in order of specificity
# Paired: word — aside — word (aside must not cross sentence boundaries)
PAIRED_EMDASH = re.compile(r'(\S+)\s*—\s*([^—.!?\n]+?)\s*—\s*(\S+)')
SINGLE_EMDASH = re.compile(r'\s*—\s*')  # standalone em dash

# Device options, keyed by CLI flag value
ASIDE_DEVICES = {
    'parens': lambda pre, aside, post: f'{pre} ({aside}) {post}',
    'hyphen': lambda pre, aside, post: f'{pre} - {aside} - {post}',
    'comma': lambda pre, aside, post: f'{pre}, {aside}, {post}',
}
INLINE_DEVICES = {
    'hyphen': ' - ',
    'comma': ', ',
    'colon': ': ',
    'semicolon': '; ',
}


def classify_emdash_usage(text: str, match_start: int, match_end: int) -> str:
    """Classify how an em dash is being used based on context."""
    before = text[:match_start].rstrip()
    after = text[match_end:].lstrip()

    # If the after-text starts with a short word and leads to a period,
    # it's likely a dramatic pivot: "That's the answer — quietly."
    after_words = after.split()
    if after_words and len(after_words[0]) <= 4 and not after_words[0][0].isupper():
        return 'pivot'

    # If what follows is a complete clause (has a verb-like word),
    # it's an elaboration
    if after_words and len(after_words) > 3:
        return 'elaboration'

    # Short continuation
    return 'continuation'


def replace_paired_emdashes(text: str, aside_device: str = 'auto') -> str:
    """Replace paired em dashes (parenthetical asides) with the writer's aside device."""
    replacements = []

    for match in PAIRED_EMDASH.finditer(text):
        aside = match.group(2).strip()
        if aside_device == 'auto':
            # Default human pattern: parentheses for short asides,
            # hyphen-pairs for longer ones
            device = 'parens' if len(aside) < 40 else 'hyphen'
        else:
            device = aside_device
        replacement = ASIDE_DEVICES[device](match.group(1), aside, match.group(3))
        replacements.append((match.start(), match.end(), replacement))

    # Apply replacements in reverse order to preserve positions
    for start, end, replacement in reversed(replacements):
        text = text[:start] + replacement + text[end:]

    return text


def replace_single_emdashes(text: str, max_keep: int = 2,
                            elaboration_device: str = 'hyphen',
                            continuation_device: str = 'hyphen',
                            pivot_device: str = 'period') -> str:
    """Replace single em dashes with the writer's natural devices.

    Keeps up to max_keep em dashes in the piece (most writers do use
    them occasionally, just not as their primary device).
    """
    matches = list(SINGLE_EMDASH.finditer(text))
    if not matches:
        return text

    # If we're under the limit, keep them all
    if len(matches) <= max_keep:
        return text

    # Decide which ones to keep (prioritize dramatic pivots)
    keep_indices = set()
    for i, match in enumerate(matches):
        ctx = classify_emdash_usage(text, match.start(), match.end())
        if ctx == 'pivot' and len(keep_indices) < max_keep:
            keep_indices.add(i)

    # If we still have room, keep random ones
    remaining = [i for i in range(len(matches)) if i not in keep_indices]
    while len(keep_indices) < max_keep and remaining:
        pick = random.choice(remaining)
        remaining.remove(pick)
        keep_indices.add(pick)

    # Replace the ones we're not keeping
    # Work backwards to preserve positions
    for i in reversed(range(len(matches))):
        if i in keep_indices:
            continue

        match = matches[i]
        ctx = classify_emdash_usage(text, match.start(), match.end())

        if ctx == 'elaboration':
            replacement = INLINE_DEVICES[elaboration_device]
        elif ctx == 'pivot':
            if pivot_device == 'period':
                # Period + new sentence for hard pivots
                before = text[:match.start()].rstrip()
                if before and before[-1] not in '.!?':
                    replacement = '. '
                else:
                    replacement = ' '
            else:
                replacement = INLINE_DEVICES[pivot_device]
        else:
            replacement = INLINE_DEVICES[continuation_device]

        text = text[:match.start()] + replacement + text[match.end():]

    return text


def de_emdash(text: str, max_keep: int = 2, aside_device: str = 'auto',
              elaboration_device: str = 'hyphen',
              continuation_device: str = 'hyphen',
              pivot_device: str = 'period') -> str:
    """Main processing pipeline."""
    # Step 1: Handle paired em dashes first (they're the clearest pattern)
    text = replace_paired_emdashes(text, aside_device=aside_device)

    # Step 2: Handle remaining single em dashes
    text = replace_single_emdashes(
        text, max_keep=max_keep,
        elaboration_device=elaboration_device,
        continuation_device=continuation_device,
        pivot_device=pivot_device,
    )

    # Step 3: Clean up any double spaces introduced
    text = re.sub(r'  +', ' ', text)

    # Step 4: Clean up period-space-lowercase (capitalize after new sentences)
    def capitalize_after_period(m):
        return m.group(1) + m.group(2).upper()
    text = re.sub(r'(\. )([a-z])', capitalize_after_period, text)

    return text


def main():
    parser = argparse.ArgumentParser(
        description='Replace em dashes with the writer\'s natural punctuation '
                    'devices (configurable from a voice profile)'
    )
    parser.add_argument('input', nargs='?', help='Input file (reads stdin if omitted)')
    parser.add_argument('-o', '--output', help='Output file (writes stdout if omitted)')
    parser.add_argument('--max-emdash', type=int, default=2,
                        help='Maximum em dashes to keep per piece (default: 2)')
    parser.add_argument('--aside', choices=['auto', 'parens', 'hyphen', 'comma'],
                        default='auto',
                        help='Device for parenthetical asides (default: auto — '
                             'parens for short asides, hyphens for long)')
    parser.add_argument('--elaboration', choices=sorted(INLINE_DEVICES),
                        default='hyphen',
                        help='Device for elaborations (default: hyphen)')
    parser.add_argument('--continuation', choices=sorted(INLINE_DEVICES),
                        default='hyphen',
                        help='Device for short continuations (default: hyphen)')
    parser.add_argument('--pivot', choices=['period'] + sorted(INLINE_DEVICES),
                        default='period',
                        help='Device for dramatic pivots (default: period — '
                             'hard sentence break)')
    parser.add_argument('--seed', type=int, help='Random seed for reproducible output')

    args = parser.parse_args()

    if args.seed is not None:
        random.seed(args.seed)

    # Read input
    if args.input:
        with open(args.input, 'r') as f:
            text = f.read()
    else:
        text = sys.stdin.read()

    # Process
    result = de_emdash(
        text, max_keep=args.max_emdash, aside_device=args.aside,
        elaboration_device=args.elaboration,
        continuation_device=args.continuation,
        pivot_device=args.pivot,
    )

    # Write output
    if args.output:
        with open(args.output, 'w') as f:
            f.write(result)
    else:
        sys.stdout.write(result)


if __name__ == '__main__':
    main()
