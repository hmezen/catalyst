import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';
import log from 'loglevel';
import { CatFormHint } from '../cat-form-hint/cat-form-hint';
import { catI18nRegistry as i18n } from '../cat-i18n/cat-i18n-registry';
import { InputType } from './input-type';

let nextUniqueId = 0;

/**
 * Inputs are used to allow users to provide text input when the expected input
 * is short. As well as plain text, Input supports various types of text,
 * including passwords and numbers.
 *
 * @slot hint - Optional hint element to be displayed with the input.
 * @slot label - The slotted label. If both the label property and the label slot are present, only the label slot will be displayed.
 * @part label - The label content.
 * @part prefix - The text prefix.
 * @part suffix - The text suffix.
 */
@Component({
  tag: 'cat-input',
  styleUrl: 'cat-input.scss',
  shadow: true
})
export class CatInput {
  private readonly _id = `cat-input-${ nextUniqueId++ }`;
  private get id() {
    return this.identifier || this._id;
  }

  private input!: HTMLInputElement;

  @Element() hostElement!: HTMLElement;

  @State() hasSlottedLabel = false;

  /**
   * Whether the label need a marker to shown if the input is required or optional.
   */
  @Prop() requiredMarker: 'none' | 'required' | 'optional' | 'none!' | 'optional!' | 'required!' = 'optional';

  /**
   * Hint for form autofill feature.
   */
  @Prop() autoComplete?: string;

  /**
   * Whether the input should show a clear button.
   */
  @Prop() clearable = false;

  /**
   * Whether the input is disabled.
   */
  @Prop() disabled = false;

  /**
   * Optional hint text(s) to be displayed with the input.
   */
  @Prop() hint?: string | string[];

  /**
   * The name of an icon to be displayed in the input.
   */
  @Prop() icon?: string;

  /**
   * Display the icon on the right.
   */
  @Prop() iconRight = false;

  /**
   * A unique identifier for the input.
   */
  @Prop() identifier?: string;

  /**
   * The label for the input.
   */
  @Prop() label = '';

  /**
   * Visually hide the label, but still show it to assistive technologies like screen readers.
   */
  @Prop() labelHidden = false;

  /**
   * A maximum value for date, time and numeric values.
   */
  @Prop() max?: number | string;

  /**
   * A maximum length (number of characters) for textual values.
   */
  @Prop() maxLength?: number;

  /**
   * A minimum value for date, time and numeric values.
   */
  @Prop() min?: number | string;

  /**
   * A minimum length (number of characters) for textual values.
   */
  @Prop() minLength?: number;

  /**
   * The name of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop() name?: string;

  /**
   * The placeholder text to display within the input.
   */
  @Prop() placeholder?: string;

  /**
   * A textual prefix to be displayed in the input.
   */
  @Prop() textPrefix?: string;

  /**
   * A textual suffix to be displayed in the input.
   */
  @Prop() textSuffix?: string;

  /**
   * The value is not editable.
   */
  @Prop() readonly = false;

  /**
   * A value is required or must be check for the form to be submittable.
   */
  @Prop() required = false;

  /**
   * Use round input edges.
   */
  @Prop() round = false;

  /**
   * Type of form control.
   */
  @Prop() type: InputType = 'text';

  /**
   * The value of the control.
   */
  @Prop({ mutable: true }) value?: string | number;

  /**
   * Flag that indicates if the input is invalid.
   */
  @Prop({ mutable: true }) invalid = false;

  /**
   * Validation errors. Will render a hint under the input with the translated error message `error.${key}`.
   */
  @Prop({ mutable: true }) errors?:{ [key: string]: unknown };

  /**
   * Disable validation for the input. No error messages or error colors will be shown.
   */
  @Prop() disableValidation = false;

  /**
   * Attributes that will be added to the input element.
   */
  @Prop() inputAttributes?: { [key: string]: string };

  /**
   * Emitted when the value is changed.
   */
  @Event() catChange!: EventEmitter;

  /**
   * Emitted when the input received focus.
   */
  @Event() catFocus!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() catBlur!: EventEmitter<FocusEvent>;

  componentWillRender(): void {
    this.hasSlottedLabel = !!this.hostElement.querySelector('[slot="label"]');
    if (!this.label && !this.hasSlottedLabel) {
      log.warn('[A11y] Missing ARIA label on input', this);
    }
  }

  /**
   * Programmatically move focus to the input. Use this method instead of
   * `input.focus()`.
   *
   * @param options An optional object providing options to control aspects of
   * the focusing process.
   */
  @Method()
  async doFocus(options?: FocusOptions): Promise<void> {
    this.input.focus(options);
  }

  /**
   * Programmatically remove focus from the input. Use this method instead of
   * `input.blur()`.
   */
  @Method()
  async doBlur(): Promise<void> {
    this.input.blur();
  }

  /**
   * Programmatically simulate a click on the input.
   */
  @Method()
  async doClick(): Promise<void> {
    this.input.click();
  }

  /**
   * Clear the input.
   */
  @Method()
  async clear(): Promise<void> {
    this.value = '';
  }

  render() {
    return (
      <Host>
        { (this.hasSlottedLabel || this.label) && (
          <label htmlFor={ this.id } class={ { hidden: this.labelHidden } }>
            <span part="label">
              { (this.hasSlottedLabel && <slot name="label"></slot>) || this.label }
              { !this.required && this.requiredMarker.startsWith('optional') && (
                <span class="input-optional" aria-hidden="true">
                  ({ i18n.t('input.optional') })
                </span>
              ) }
              { this.required && this.requiredMarker.startsWith('required') && (
                <span class="input-optional" aria-hidden="true">
                  ({ i18n.t('input.required') })
                </span>
              ) }
            </span>
          </label>
        ) }
        <div
          class={ {
            'input-wrapper': true,
            'input-round': this.round,
            'input-disabled': this.disabled,
            'input-invalid': this.invalid && !this.disableValidation,
          } }
          onClick={ () => this.input.focus() }
        >
          { this.textPrefix && (
            <span class="text-prefix" part="prefix">
              { this.textPrefix }
              { this.invalid }
            </span>
          ) }
          { this.icon && !this.iconRight && <cat-icon icon={ this.icon } class="icon-prefix" size="l"></cat-icon> }
          <div class="input-inner-wrapper">
            <input
              { ...this.inputAttributes }
              ref={ el => (this.input = el as HTMLInputElement) }
              id={ this.id }
              class={ {
                'has-clearable': this.clearable && !this.disabled
              } }
              autocomplete={ this.autoComplete }
              disabled={ this.disabled }
              max={ this.max }
              maxlength={ this.maxLength }
              min={ this.min }
              minlength={ this.minLength }
              name={ this.name }
              placeholder={ this.placeholder }
              readonly={ this.readonly }
              required={ this.required }
              type={ this.type }
              value={ this.value }
              onInput={ this.onInput.bind(this) }
              onFocus={ this.onFocus.bind(this) }
              onBlur={ this.onBlur.bind(this) }
              aria-invalid={ this.invalid ? 'true' : 'false' }
              aria-describedby={ this.id + '-hint'}
            ></input>
            { this.clearable && !this.disabled && this.value && (
              <cat-button
                class="clearable"
                icon="cross-circle-outlined"
                icon-only="true"
                size="s"
                variant="text"
                a11y-label={ i18n.t('input.clear') }
                onClick={ this.clear.bind(this) }
              ></cat-button>
            ) }
          </div>
          { (!this.invalid || this.disableValidation) && this.icon && this.iconRight && <cat-icon icon={ this.icon } class="icon-suffix" size="l"></cat-icon> }
          { this.invalid && !this.disableValidation && <cat-icon icon="alert-circle-outlined" class="icon-suffix cat-text-danger" size="l"></cat-icon>}
          { this.textSuffix && (
            <span class="text-suffix" part="suffix">
              { this.textSuffix }
            </span>
          ) }
        </div>
        <div id={this.id + '-hint'}>
          { this.hintSection }
        </div>
      </Host>
    );
  }

  private get hintSection() {
    if (this.errors && !this.disableValidation) {
      return Object.keys(this.errors).map(error =>
        (
          <CatFormHint hint={ i18n.t(`error.${error}`) } class="cat-text-danger" />
        )
      );
    }
    const hasSlottedHint = !!this.hostElement.querySelector('[slot="hint"]');
    return (
      (this.hint || hasSlottedHint) && (
        <CatFormHint hint={ this.hint } slottedHint={ hasSlottedHint && <slot name="hint"></slot> }/>
      )
    );
  }

  private onInput(event: Event) {
    this.value = this.input.value;
    this.catChange.emit(event);
  }

  private onFocus(event: FocusEvent) {
    this.catFocus.emit(event);
  }

  private onBlur(event: FocusEvent) {
    this.catBlur.emit(event);
  }
}
