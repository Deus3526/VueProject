<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <!-- <a class="navbar-brand" href="#">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button> -->
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/about">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" aria-current="page" to="/DashBoard/Products">Products</router-link>
                    </li>
                </ul>
                <span class="navbar-text">
                    <!-- NavBar-Text -->
                    <router-link v-if="!isLogin" to="/Login" class="nav-link">登入</router-link>
                    <a v-if="isLogin" @click.prevent="logOut()" href="#" class="nav-link">登出</a>
                </span>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'NavBar',
    data() {
        return {
            isLogin:false
        }
    },
    methods: {
        logOut(){
            //從環境變數取得登入的ApiUrl
            let url=process.env.VUE_APP_API+'logout';

            //透過Api驗證登入
            this.axios.post(url,this.user)
            .then(res => {
                if(res.data.success==true)
                {
                    alert('您已登出');
                    this.isLogin=false;
                    document.cookie='hexToken=;'
                    this.$router.push('/Login');
                }
                else{
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    created(){
        this.$emitter.on('Login',(data)=>{this.isLogin=data});
        let token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        //登出後或未登入的token都是空值，以此先驗證避免ajax的等待時間
        if(token=='') 
        {
            this.isLogin=false;
            return;
        }
        //設定全域axios的header，之後用axios發送的header則都會帶有Authorization
        this.axios.defaults.headers.common.Authorization = token;
        const apiUrl = process.env.VUE_APP_API + 'api/user/check';
        this.axios.post(apiUrl, null).then(res => {
            //驗證如果失敗導回到登入頁面
            if (!res.data.success) {
                this.isLogin=false;
                alert('您的登入已過期，請重新登入')
                this.$router.push('/Login');
            }
            else
            {
                this.isLogin=true;
            }
        }).catch(err => {
            console.log(err)
            this.$router.push('/Login');
        })
    }
}
</script>