<script>
    import "../app.css";
</script>

<svelte:head>
    <title>Wetter für Deutschland und die Welt</title>
    <meta name="keywords"
          content="Wind, Segeln, windvorhersage, Wettervorhersage, sailing-weather, sailing, weather, forecast">
    <meta name="description"
          content="Der Beste Ort um Wetter- und Winddaten in Deutschland und in der ganzen Welt abzurufen">
    <link rel="manifest" crossorigin="use-credentials" href="/manifest.json">
    <meta property="og:type" content="website">
    <meta property="og:image" content="https://sailing-weather.de/preview.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="628">
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:image" content="https://sailing-weather.de/preview.png">
</svelte:head>
<div class="h-full">
    <header class="navbar bg-base-100">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost normal-case text-xl">Wetter</a>
        </div>
        <div class="flex-2">
        </div>
    </header>
    <main>
        <slot/>
    </main>
    <footer class="footer footer-center p-10 bg-base-200 text-base-content rounded">
        <a class="pb-0 mb-0 link-hover" href="https://open-meteo.com/">Weather data by Open-Meteo.com</a>
        <div class="grid grid-flow-col gap-4">
            <a href="/impressum" class="link link-hover">Impressum</a>
            <a href="/datenschutz" class="link link-hover">Datenschutz</a>
            <a href="/haftungsausschluss" class="link link-hover">Haftungsauschluss</a>
        </div>
        <div>
            <p>Copyright © {new Date().getFullYear()} - Silas Pachali</p>
        </div>
    </footer>
</div>