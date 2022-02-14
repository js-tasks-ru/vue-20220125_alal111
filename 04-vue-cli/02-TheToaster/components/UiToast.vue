<template>
    <div>
        <button style="cursor: pointer" @click="$emit('close', toast.id, 0)">x</button>
        <div class="toast" :class="[`toast_${toast.type}`]">
            <ui-icon class="toast__icon" :icon="toast.icon" />
            <span>{{ toast.text }}</span>
        </div>
    </div>

</template>

<script>
    import UiIcon from './UiIcon';

    export default {
        name: "UiToast",
        components: {
            UiIcon
        },
        emits: ['close'],
        props: {
            toast: {
                type: Object,
                required: true
            }
        },
    }
</script>

<style scoped>
    .toast {
        display: flex;
        flex: 0 0 auto;
        flex-direction: row;
        align-items: center;
        padding: 16px;
        background: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        font-size: 18px;
        line-height: 28px;
        width: auto;
    }

    .toast + .toast {
        margin-top: 20px;
    }

    .toast__icon {
        margin-right: 12px;
    }

    .toast.toast_success {
        color: var(--green);
    }

    .toast.toast_error {
        color: var(--red);
    }
</style>