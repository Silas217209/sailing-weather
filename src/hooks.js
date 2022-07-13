/** @type {import('@sveltejs/kit').HandleError} */
export async function handleError({ error, event }) {
  // example integration with https://sentry.io/
  console.log(error)
}