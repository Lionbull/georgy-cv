<script>
    import Terminal from "../components/Terminal.svelte";
</script>

<div class="main-content">
    <a style="color: #FFFFFF;" href="/classic_cv" target="_blank"><div class="button-classic-cv">Classic CV</div></a>
    <Terminal />
</div>

<style>
    .main-content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #1e1e1e;
        color: #00ff00;
        font-family: 'Courier New', Courier, monospace;
        gap: 1rem;
    }

    .button-classic-cv {
        background-color: #00ff00;
        color: #1e1e1e;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
    }

    a {
        text-decoration: none;
    }
</style>