<template>
    <RouterLink to="/DashBoard">DashBoard</RouterLink>
    <div class="container mt-5">
        <form class="row justify-content-center" @submit.prevent="signIn()">
            <div class="col-md-6">
                <h1 class="h3 mb-3 font-weight-normal">請先登入</h1>
                <div class="mb-2">
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required v-model="user.username" autofocus />
                </div>
                <div class="mb-2">
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="user.password" autocomplete="off"/>
                </div>

                <div class="text-end mt-4">
                    <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>

export default {
    data() {
        return {
            user:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        signIn(){
            //從環境變數取得登入的ApiUrl
            let url=process.env.VUE_APP_API+'admin/signin';

            //透過Api驗證登入
            this.axios.post(url,this.user)
            .then(res => {
                // 成功的話將取得的toke存入cookie，並且導向到DashBoard頁面
                if(res.data.success==true)
                {
                    const token=res.data.token;
                    const expired=res.data.expired;
                    //cookie為一對對的KeyValue鍵值，當鍵值設定完成可用;區隔，然後設定cookie的設定，例如過期時間
                    document.cookie=`hexToken=${token};expires=${new Date(expired)}`; // toekn為用來驗證登入狀態，expires為過期時間
                    alert(res.data.message);
                    this.$emitter.emit('Login',true);
                    this.$router.push('/DashBoard/Products');
                   
                }
                else{
                    alert(res.data.message);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>