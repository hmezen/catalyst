# cat-datepicker



<!-- Auto Generated Below -->


## Properties

| Property                 | Attribute         | Description                                                                                                                                                                                                                                                                                                                     | Type                                                                          | Default      |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ------------ |
| `autoComplete`           | `auto-complete`   | Hint for form autofill feature.                                                                                                                                                                                                                                                                                                 | `string \| undefined`                                                         | `undefined`  |
| `clearable`              | `clearable`       | Whether the input should show a clear button.                                                                                                                                                                                                                                                                                   | `boolean`                                                                     | `false`      |
| `disabled`               | `disabled`        | Whether the input is disabled.                                                                                                                                                                                                                                                                                                  | `boolean`                                                                     | `false`      |
| `errorUpdate`            | `error-update`    | Fine-grained control over when the errors are shown. Can be `false` to never show errors, `true` to show errors on blur, or a number to show errors on change with the given delay in milliseconds.                                                                                                                             | `boolean \| number`                                                           | `0`          |
| `errors`                 | `errors`          | The validation errors for this input. Will render a hint under the input with the translated error message(s) `error.${key}`. If an object is passed, the keys will be used as error keys and the values translation parameters. If the value is `true`, the input will be marked as invalid without any hints under the input. | `boolean \| string[] \| undefined \| { [key: string]: any; }`                 | `undefined`  |
| `hint`                   | `hint`            | Optional hint text(s) to be displayed with the input.                                                                                                                                                                                                                                                                           | `string \| string[] \| undefined`                                             | `undefined`  |
| `horizontal`             | `horizontal`      | Whether the label is on top or left.                                                                                                                                                                                                                                                                                            | `boolean`                                                                     | `false`      |
| `icon`                   | `icon`            | The name of an icon to be displayed in the input.                                                                                                                                                                                                                                                                               | `string \| undefined`                                                         | `undefined`  |
| `iconRight`              | `icon-right`      | Display the icon on the right.                                                                                                                                                                                                                                                                                                  | `boolean`                                                                     | `false`      |
| `identifier`             | `identifier`      | A unique identifier for the input.                                                                                                                                                                                                                                                                                              | `string \| undefined`                                                         | `undefined`  |
| `label`                  | `label`           | The label for the input.                                                                                                                                                                                                                                                                                                        | `string`                                                                      | `''`         |
| `labelHidden`            | `label-hidden`    | Visually hide the label, but still show it to assistive technologies like screen readers.                                                                                                                                                                                                                                       | `boolean`                                                                     | `false`      |
| `max`                    | `max`             | A maximum value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z.                                                                                                                                                                                                                                                              | `string \| undefined`                                                         | `undefined`  |
| `min`                    | `min`             | A minimum value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z.                                                                                                                                                                                                                                                              | `string \| undefined`                                                         | `undefined`  |
| `mode`                   | `mode`            | The mode of the datepicker, to select a date, time, both, a date range or a week number.                                                                                                                                                                                                                                        | `"date" \| "daterange" \| "datetime" \| "time" \| "week"`                     | `'date'`     |
| `name`                   | `name`            | The name of the form control. Submitted with the form as part of a name/value pair.                                                                                                                                                                                                                                             | `string \| undefined`                                                         | `undefined`  |
| `nativeAttributes`       | --                | Attributes that will be added to the native HTML input element.                                                                                                                                                                                                                                                                 | `undefined \| { [key: string]: string; }`                                     | `undefined`  |
| `nativePickerAttributes` | --                | Attributes that will be added to the rendered HTML datepicker element.                                                                                                                                                                                                                                                          | `undefined \| { [key: string]: string; }`                                     | `undefined`  |
| `placeholder`            | `placeholder`     | The placeholder text to display within the input.                                                                                                                                                                                                                                                                               | `string \| undefined`                                                         | `undefined`  |
| `readonly`               | `readonly`        | The value is not editable.                                                                                                                                                                                                                                                                                                      | `boolean`                                                                     | `false`      |
| `required`               | `required`        | A value is required or must be check for the form to be submittable.                                                                                                                                                                                                                                                            | `boolean`                                                                     | `false`      |
| `requiredMarker`         | `required-marker` | Whether the label need a marker to shown if the input is required or optional.                                                                                                                                                                                                                                                  | `"none!" \| "none" \| "optional!" \| "optional" \| "required!" \| "required"` | `'optional'` |
| `step`                   | `step`            | The step size to use when changing the time.                                                                                                                                                                                                                                                                                    | `number`                                                                      | `5`          |
| `textPrefix`             | `text-prefix`     | A textual prefix to be displayed in the input.                                                                                                                                                                                                                                                                                  | `string \| undefined`                                                         | `undefined`  |
| `textSuffix`             | `text-suffix`     | A textual suffix to be displayed in the input.                                                                                                                                                                                                                                                                                  | `string \| undefined`                                                         | `undefined`  |
| `value`                  | `value`           | The value as ISO Date string, e.g. 2017-03-04T01:23:43.000Z or as a week number string.                                                                                                                                                                                                                                         | `string \| undefined`                                                         | `undefined`  |


## Events

| Event       | Description                            | Type                      |
| ----------- | -------------------------------------- | ------------------------- |
| `catBlur`   | Emitted when the input loses focus.    | `CustomEvent<FocusEvent>` |
| `catChange` | Emitted when the value is changed.     | `CustomEvent<string>`     |
| `catFocus`  | Emitted when the input received focus. | `CustomEvent<FocusEvent>` |


## Methods

### `doBlur() => Promise<void>`

Programmatically remove focus from the datepicker. Use this method instead of
`input.blur()`.

#### Returns

Type: `Promise<void>`



### `doFocus(options?: FocusOptions) => Promise<void>`

Programmatically move focus to the datepicker. Use this method instead of
`input.focus()`.

#### Returns

Type: `Promise<void>`




## Dependencies

### Depends on

- [cat-input](../cat-input)

### Graph
```mermaid
graph TD;
  cat-datepicker --> cat-input
  cat-input --> cat-icon
  cat-input --> cat-button
  cat-button --> cat-icon
  cat-button --> cat-spinner
  style cat-datepicker fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

Made with love in Hamburg, Germany