<script lang="ts">
    import { onMount } from 'svelte';
    let q = '';

    onMount(async () => {
        const { initFlowbite } = await import('flowbite'); // активирует collapse & dropdown
        initFlowbite();
    });

    const submit = (e: Event) => {
        e.preventDefault();
        // TODO: дернуть поиск
    };
</script>

<header class="sticky top-0 z-50 border-b border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700">
    <div class="h-16 max-w-screen-xl mx-auto px-4 lg:px-6 flex items-center gap-3">
        <!-- ЛОГО -->
        <a href="/" class="flex items-center gap-2 shrink-0">
            <img src="src/lib/assets/icon.svg" class="h-6 sm:h-8" alt="Logo" />
            <span class="hidden sm:inline text-lg font-semibold dark:text-white">Mikado CRM</span>
        </a>
        
        <form on:submit|preventDefault={submit} class="hidden md:block w-full max-w-xl">
            <label class="relative block">
        <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 102.546 7.06l3.697 3.697a1 1 0 001.414-1.414l-3.697-3.697A4 4 0 008 4zm-2 4a2 2 0 114 0 2 2 0 01-4 0z" clip-rule="evenodd"/></svg>
        </span>
                <input
                        bind:value={q}
                        type="search"
                        placeholder="Search clients, masters, services..."
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                 pl-10 pr-3 py-2 text-sm placeholder-gray-400 dark:placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                />
            </label>
        </form>

        <!-- ПРАВАЯ ПАНЕЛЬ -->
        <div class="ml-auto flex items-center gap-1">
            <!-- Кнопка открытия поиска на мобилках -->
            <button
                    data-collapse-toggle="mobile-search"
                    aria-controls="mobile-search"
                    class="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
               dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-label="Open search"
            >
                <svg class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 102.546 7.06l3.697 3.697a1 1 0 001.414-1.414l-3.697-3.697A4 4 0 008 4z" clip-rule="evenodd"/></svg>
            </button>

            <!-- Уведомления -->
            <button class="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                     dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-label="Notifications">
                <svg class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6v2.586l-.707.707A1 1 0 004 13h12a1 1 0 00.707-1.707L16 10.586V8a6 6 0 00-6-6z"/><path d="M7 14a3 3 0 006 0H7z"/></svg>
                <span class="absolute -top-0.5 -right-0.5 inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </button>

            <!-- Сообщения -->
            <button class="p-2 rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200
                     dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-label="Messages">
                <svg class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor"><path d="M18 5a2 2 0 00-2-2H4a2 2 0 00-2 2v9a2 2 0 002 2h3l3 2 3-2h3a2 2 0 002-2V5z"/></svg>
            </button>

            <!-- Аватар + дропдаун -->
            <button
                    type="button"
                    data-dropdown-toggle="user-menu"
                    class="ml-1 rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="User menu"
            >
                <img class="h-8 w-8 rounded-full object-cover" src="https://mockmind-api.uifaces.co/content/human/125.jpg" alt="User" />
            </button>

            <div id="user-menu" class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow
                                 dark:bg-gray-700 dark:divide-gray-600">
                <div class="px-4 py-3">
                    <p class="text-sm text-gray-900 dark:text-white">Alex</p>
                    <p class="text-sm text-gray-500 truncate dark:text-gray-400">alex@example.com</p>
                </div>
                <ul class="py-1">
                    <li><a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Profile</a></li>
                    <li><a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600">Settings</a></li>
                    <li><a class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-600">Sign out</a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- МОБИЛЬНЫЙ ПОИСК (раскрывается по кнопке) -->
    <div id="mobile-search" class="hidden md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <form on:submit|preventDefault={submit} class="px-4 py-3">
            <label class="relative block">
        <span class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8 4a4 4 0 102.546 7.06l3.697 3.697a1 1 0 001.414-1.414l-3.697-3.697A4 4 0 008 4z" clip-rule="evenodd"/></svg>
        </span>
                <input
                        bind:value={q}
                        type="search"
                        placeholder="Search…"
                        class="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700
                 pl-10 pr-3 py-2 text-sm placeholder-gray-400 dark:placeholder-gray-400
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white"
                />
            </label>
        </form>
    </div>
</header>
