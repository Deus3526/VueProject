<template>
    <div>DashBoard</div>
    <div class="container-fluid">
        <RouterView></RouterView>
    </div>

</template>

<script>
export default {

    data() {
        return {

        }
    },
    created() {
        //從cookie取的hexToken的值再丟去Api驗證目前這個token的user是否為登入狀態
        let token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        //登出後或未登入的token都是空值，以此先驗證避免ajax的等待時間
        if (token == '') {
            alert('請先登入');
            this.$router.push('/Login');
            return;
        }
        //設定全域axios的header，之後用axios發送的header則都會帶有Authorization
        this.axios.defaults.headers.common.Authorization = token;
        const apiUrl = process.env.VUE_APP_API + 'api/user/check';
        this.axios.post(apiUrl, null).then(res => {
            //驗證如果失敗導回到登入頁面
            if (!res.data.success) {
                alert('您的登入已過期，請重新登入')
                this.$router.push('/Login');
            }
        }).catch(err => {
            console.log(err)
            this.$router.push('/Login');
        })
    },
}
</script>