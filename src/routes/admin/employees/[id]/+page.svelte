<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
    import { createQuery } from '@tanstack/svelte-query'
    import {type EmployeeDetailsDto, getEmployee} from "$lib/api/employees";
    
    const query = createQuery<EmployeeDetailsDto>({
        queryKey: ['employee', data.params.id],
        queryFn: async() => await getEmployee(data.params.id)
    });
    
    
</script>

{#if $query.status === 'pending'}
    <p>Loading...</p>
{/if}

{#if $query.status === 'error'}
    <p>Error :(</p>
{/if}

{#if $query.status === 'success'}
    <div class="mx-auto max-w-screen-xl p-3 sm:p-5 ">
        <header class="mb-4 lg:mb-6 not-format">
            <address class="flex items-center mb-6 not-italic">
                <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img class="mr-4 w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos">
                    <div>
                        
                        <div class="flex items-center">
                            <p class="text-xl font-bold text-gray-900 dark:text-white">{$query.data.name}</p>
                            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 ms-1 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                            <svg class="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                            </svg>
                        </div>
                        <p class="text-base text-gray-500 dark:text-gray-400">{$query.data.category}, {$query.data.status}, {$query.data.hire_date}</p>
                        <!--p class="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime={$query.data.hire_date} title={new Date($query.data.hire_date).toLocaleDateString()}>{$query.data.hire_date}</time></p-->
                    </div>
                </div>
            </address>
            
            <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2">
                    <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Today's schedule</h1>
                    <ol class="relative border-s border-gray-200 dark:border-gray-700">
                    <li class="mb-10 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">08:30</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Anna Newman</h3>
                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">French manicure, cleaning ang other girls things witch I don't know</p>
                    </li>
                    <li class="mb-10 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">11:00</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Natalia Volkova</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Heel massage</p>
                    </li>
                    <li class="ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">17:15</time>
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Liudmila Stahanova</h3>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">Manicure, pedicure, hand and heel massage</p>
                    </li>
                </ol>
                </div>
                <div class="col-span-1">
                    <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">Working hours</h1>
                    <ol class="relative border-s border-gray-200 dark:border-gray-700">
                    <li class="mb-5 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Monday</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">8:00 - 17:00</p>
                    </li>
                    <li class="mb-5 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Tuesday</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">8:00 - 17:00</p>
                    </li>
                    <li class="mb-5 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Wednesday</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">8:00 - 17:00</p>
                    </li>
                    <li class="mb-5 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Thursday</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">8:00 - 17:00</p>
                    </li>
                    <li class="mb-5 ms-4">
                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Friday</time>
                        <p class="text-base font-normal text-gray-500 dark:text-gray-400">8:00 - 17:00</p>
                    </li>
                </ol>
                </div>
                
            </div>
            
            <!--Here reviews-->

        </header>
    </div>
{/if}