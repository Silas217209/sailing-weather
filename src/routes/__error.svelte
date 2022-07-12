<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export function load({ error, status }) {
    return {
      props: {
        title: `${status}`
      }
    };
  }
</script>

<script>
  import "../app.css"
  export let title;
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
  <h1 class="text-5xl">{title}</h1>
  <a class="hover:underline m-8" href="/">Back Home</a>
</div>