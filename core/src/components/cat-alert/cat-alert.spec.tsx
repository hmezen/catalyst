import { newSpecPage } from '@stencil/core/testing';
import { CatAlert } from './cat-alert';

describe('cat-alert', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatAlert],
      html: `<cat-alert></cat-alert>`
    });
    expect(page.root).toEqualHtml(`
      <cat-alert color="primary" role="status" tabindex="0">
        <mock:shadow-root>
          <cat-icon icon="star-circle-filled" size="l"></cat-icon>
          <div class="content">
              <slot></slot>
          </div>
        </mock:shadow-root>
      </cat-alert>
    `);
  });
});
