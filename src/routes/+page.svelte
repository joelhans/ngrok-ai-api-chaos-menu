<script lang="ts">
  import SvelteMarkdown from 'svelte-markdown'
  import "../app.css";

  let locationInput: any;
  let coursesInput: any;
  let personalityInput: any;
  let result = '';
  let loading = false;

  async function onSubmit(event: any) {
    event.preventDefault();
    loading = true;

    const response = await fetch('/api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: locationInput, courses: coursesInput, personality: personalityInput }),
    })

    const data = await response.json();

    if (data.status == 400) {
      loading = false;
      result = data.message
    } else {
      loading = false;
      result = data.result
    }

    
  }
</script>

<main class="max-w-5xl mx-auto my-24 p-12 bg-gray-100 rounded-sm">
  <h1 class="text-5xl mb-8">Generate a chaos menu:</h1>

  <div class="form">
    <form method="POST" class="mb-8" on:submit={onSubmit}>
      <div class="label">
        <input
          class="block min-w-[500px] p-4 rounded"
          type="search"
          name="prompt"
          bind:value={locationInput}
          placeholder="Where is your restaurant located?"
          required
        />
        <input
          class="block min-w-[500px] mt-2 p-4 rounded"
          type="search"
          name="prompt"
          bind:value={coursesInput}
          placeholder="How many courses?"
          required
        />
        <input
          class="block min-w-[500px] mt-2 p-4 rounded"
          type="search"
          name="prompt"
          bind:value={personalityInput}
          placeholder="How would you describe your cuisine?"
          required
        />
        <button class="mt-2 p-4 bg-green-400 rounded-sm">Go!</button>
      </div>
    </form>

    <div class="prose min-w-full min-h-8 p-8 rounded-sm bg-white">

      {#if loading == true}
        <p>Generating your chaos menu...</p>
      {:else if result}
        <SvelteMarkdown source={result} />
      {/if}
    </div>
  </div>
</main>

<style>

</style>
