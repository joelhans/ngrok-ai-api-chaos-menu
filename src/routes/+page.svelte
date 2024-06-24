<script lang="ts">
  import "../app.css";

  let promptInput: any;
  let result = '';

  async function onSubmit(event: any) {
    event.preventDefault();

    const response = await fetch('/api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: promptInput }),
    })

    const data = await response.json();
    result = data.result
  }
</script>

<main class="max-w-5xl mx-auto my-24 p-12 bg-gray-100 rounded-sm">
  <h1 class="text-5xl mb-16">My app!</h1>

  <div class="form">
    <form method="POST" on:submit={onSubmit}>
      <label class="label">
        <input
          class="input min-w-full px-4 py-2 rounded-sm mb-8"
          type="search"
          name="prompt"
          bind:value={promptInput}
          placeholder="Ask me a question"
          required
        />
      </label>
    </form>

    <div class="min-w-full min-h-8 px-4 py-2 rounded-sm bg-white rounded-sm hover:cursor-not-allowed">
      {#if result}{result}{/if}
    </div>
  </div>
</main>

<style>

</style>
