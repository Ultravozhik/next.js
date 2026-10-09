import { nextTestSetup } from 'e2e-utils'
import { retry } from 'next-test-utils'

describe('new-url-dynamic-dependency', () => {
  const { next } = nextTestSetup({
    files: __dirname,
  })

  it('builds a dependency whose new URL() is only known at runtime', async () => {
    const browser = await next.browser('/')

    await retry(async () => {
      expect(await browser.elementByCss('#bundled').text()).toBe(
        'hello from the bundled worker'
      )
      expect(await browser.elementByCss('#custom').text()).toBe(
        'hello from the custom worker'
      )
    })
  })
})
