# persian-address-parser

Parse free-form Persian addresses into structured data.

Persian addresses are written as one long line of prose, with no fixed order and no fixed spelling. This library turns that line into named fields.

```ts
import { parseAddress } from 'persian-address-parser';

parseAddress('فارس شیراز خیابان زند کوچه لاله پلاک ۱۲ واحد ۳ طبقه ۲');
```

```js
{
  province: 'فارس',
  city:     'شیراز',
  street:   'زند',
  alley:    'لاله',
  number:   '12',
  unit:     '3',
  floor:    '2',
  extra:    undefined
}
```

## Install

```bash
npm install persian-address-parser
```

Zero runtime dependencies. Ships ESM and CJS builds with TypeScript types.

## API

### `parseAddress(input: string): ParsedAddress`

| Field | Type | Description |
|---|---|---|
| `province` | `string \| undefined` | Matched against the official list of 31 provinces. Inferred from the city when not written. |
| `city` | `string \| undefined` | Matched against the official city list, returned in its canonical spelling. |
| `street` | `string \| undefined` | Name after خیابان / خیابون / بلوار / خ / بل |
| `alley` | `string \| undefined` | Name after کوچه / کوی / بن‌بست / ک |
| `number` | `string \| undefined` | Plaque number. A string, because `12/1` and `12-3` are valid. |
| `unit` | `string \| undefined` | Number after واحد |
| `floor` | `string \| undefined` | Number after طبقه / ط |
| `extra` | `string \| undefined` | Everything that was recognised as none of the above. |

Fields that are not present in the input are `undefined`.

## What it handles

**Mixed numerals.** Persian `۱۲`, Arabic `١٢` and Latin `12` are all normalised before parsing.

**Arabic characters.** `ي` and `ك` are folded to `ی` and `ک`, and hamza forms are folded when matching place names — so `نایین` matches `نائین` in the reference data.

**Spacing variants.** ZWNJ, missing spaces and extra spaces are ignored when matching place names, so `ولی‌عصر`, `ولی عصر` and `ولیعصر` are treated as the same name.

**Abbreviations.** `خ`, `ک`, `پ`, `ط`, `بل`, and their variants with dots, colons and dashes.

**Missing separators.** Commas are optional. Keywords themselves act as boundaries, so `تهران خیابان بهشتی پلاک ۵` parses the same as the comma-separated form.

**Diacritics.** Harakat and invisible direction marks are stripped.

**Province inference.** If the input names only a city, the province is filled in from the reference data.

## Limitations

- **Villages and districts are not supported.** The reference data covers provinces and cities only. Anything else lands in `extra`.
- **Landmarks are not a field yet.** `نبش کارگر`, `جنب داروخانه`, `بالاتر از پارک وی` are left in `extra`.
- **Postal codes are not extracted.** They are left in place.
- **No fuzzy matching yet.** A misspelled city name that is not covered by the character-folding rules will not match. Levenshtein-based matching is planned.
- **Ambiguous city names** resolve to a single entry. Where two provinces contain a city with the same name, one of them wins.

## Accuracy

Measured against the 200 labelled addresses in `tests/fixtures/addresses.json`:

| Field | |
|---|---|
| number | 100% |
| unit | 100% |
| floor | 100% |
| province | 98% |
| alley | 94% |
| city | 81% |
| street | 78% |

Most of that fixture set is synthetic and deliberately messy, but it is still cleaner than real user input, so treat these as an upper bound rather than a promise. Contributions of real addresses are welcome — see below.

## Contributing

One of the useful contribution is data. If the parser gets an address wrong, add it to `tests/fixtures/addresses.json` with the expected output and open a pull request. Please do not submit anyone's home address.

```bash
git clone https://github.com/rezadev8/persian-address-parser
npm install
npm test
```

`npm run accuracy` reports per-field accuracy across the whole fixture set.

## License

MIT