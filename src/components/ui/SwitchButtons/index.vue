<script setup lang="ts">
const props = defineProps<{
    name: string;
    options: { label: string; value: string }[];
    defaultValue?: string;
}>();
const selectedValue = ref<string | undefined>(props.defaultValue);
const handler = (newValue: string) => {
    selectedValue.value = newValue;
};
watchEffect(() => {
    selectedValue.value = props.defaultValue;
});
</script>

<template>
    <div class="input-group d-flex justify-content-center flex-nowrap">
        <template v-for="option in props.options">
            <label
                :class="`btn btn-outline-secondary w-100 ${
                    selectedValue === option.value ? 'active' : ''
                }`"
                @click="() => handler(option.value)"
            >
                <input
                    type="radio"
                    class="btn-check"
                    :name="props.name"
                    :value="option.value"
                    :checked="selectedValue === option.value"
                />
                {{ option.label }}
            </label>
        </template>
    </div>
</template>
