<script setup lang="ts">
import {Permission} from '@/models/Permission'
import {Role} from '@/models/Role'
import { mdiShieldLock, mdiStore, mdiCancel } from '@mdi/js';
import { Form, SubmissionContext } from 'vee-validate';

const schema = useRoleRules()

definePageMeta({
    layout: "authenticated"
});

useHead({
	title: 'Ajouter un rôle'
})

const {$sweetalert} = useNuxtApp()

const onSubmit = async (values: any, {setErrors}: SubmissionContext) => {
    try {
        const role = await Role.$query().store({
            name: values.name,
            description: values.description,
        })
        await role.permissions().sync(values.permissions)
        navigateTo('/roles')
        $sweetalert.created()
    }catch(e: any) {
      setErrors(e.response.data.errors)
    }
  
}


const  permissions = await Permission.$query().get(500)

const items = [
        {
          title: 'Rôles',
          disabled: false,
          to: '/roles',
        },
        {
          title: 'Ajouter un rôle',
          disabled: true,
          to: '/roles/create',
        },
       
      ]
</script>

<template>
<AppToolbar title="Ajouter un rôle" :icon="mdiShieldLock" :prepend-icon="mdiShieldLock" :breadcrumbs="items"></AppToolbar>


       
<Form v-slot="{values}"  is="v-form" :initial-values="{permissions: []}" :validation-schema="schema" @submit="onSubmit">
    <v-card color="surface">
    <v-card-text>
        <div class="w-50 mx-md-auto">
            <label for="name">Nom du rôle</label>
            <text-field id="name" name="name"/>
            
        </div>
        <div class="w-50 mx-md-auto">
            <label for="description">Description du rôle</label>
            <text-field id="description" name="description"/>
        </div>
        <div class="w-50 mx-auto">
            <span class="body-1">Permissions</span>
        </div>
        <div class="w-50 mx-auto">
           
        
        <v-checkbox color="success"
            class="d-inline-block" 
            v-for="permission in permissions[0].$response?.data.data" 
            :value="permission.id" 
            :label="permission.description" 
            name="permissions" 
            v-model="values.permissions"
            multiple
            />
            
        </div>
        <div class="mx-md-auto w-50">
            <v-btn type="submit"  theme="dark" class="mr-md-2" variant="elevated" color="success">
                <v-icon start :icon="mdiStore"></v-icon>
                Enregistrer
            </v-btn>
            <v-btn :to="{name: 'roles'}" variant="elevated" color="grey">
                <v-icon start :icon="mdiCancel"></v-icon>
                Annuler
            </v-btn>
        </div>
</v-card-text>
</v-card>
</Form>

</template>