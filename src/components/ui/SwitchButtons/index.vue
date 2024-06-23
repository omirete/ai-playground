<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";

interface Option<T> {
    label: string;
    value: T;
}

const props = defineProps<{
    name: string;
    options: Option<string>[];
    modelValue?: string;
}>();

const emits = defineEmits(["update:modelValue"]);

const selectedValue = ref<string>(props.modelValue ?? props.options[0].value);

const handler = (newValue: string) => {
    selectedValue.value = newValue;
    emits("update:modelValue", newValue);
};

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue !== undefined) {
            selectedValue.value = newValue;
        }
    }
);
</script>

<template>
    <div class="input-group d-flex justify-content-center flex-nowrap">
        <template v-for="option in props.options" :key="option.value">
            <label
                :class="`btn btn-outline-secondary form-control px-1 ${
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
