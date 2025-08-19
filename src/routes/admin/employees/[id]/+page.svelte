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
    <p>{$query.data.name}</p>
{/if}