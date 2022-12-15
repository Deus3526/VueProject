<template>
    <div class="toast-container position-absolute pe-3 top-0 end-0">
        <ToastMessage v-for="(msg, key) in messages" :key="key" :msg="msg" />
    </div>
</template>
  
<script>
import ToastMessage from '@/components/ToastMessage.vue';
export default {
    components: { ToastMessage },
    data() {
        return {
            messages: [],
        };
    },
    mounted() {
        this.$emitter.on('pushToastMessage', (message) => {
            const { style = 'success', title, content } = message;
            this.messages.push({ style, title, content });
        });
    },
};
</script>