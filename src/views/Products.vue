<template>
    <div class="text-end">
        <button @click="add()" type="button" class="btn btn-primary">新增產品</button>
    </div>
    <table class="table mt-4">
        <thead>
            <tr>
                <th width="120">分類</th>
                <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="200">編輯</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in products" :key="item.id">
                <td>{{item.category}}</td>
                <td>{{item.title}} <img :src="item.imageUrl" width="100"></td>
                <td class="text-right">
                    {{item.origin_price}}
                </td>
                <td class="text-right">
                    {{item.price}}
                </td>
                <td>
                    <span v-if="item.is_enabled==1" class="text-success">啟用</span>
                    <span v-else class="text-muted">不啟用</span>
                </td>
                <td>
                    <div class="btn-group">
                        <button @click="edit(item.id)" class="btn btn-outline-primary btn-sm">編輯</button>
                        <button @click="del(item.id)" class="btn btn-outline-danger btn-sm">刪除</button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    <product-modal :propsProduct="tempProduct" :propsModalMode="modalMode" ref="ProductModal"></product-modal>
    <delete-product-modal :propsProductID="tempDelProductID" ref="delProductMoal"></delete-product-modal>
    <pagination :pages="pages" @emit-pages="getProducts"></pagination>
</template>

<script>
    import DeleteProductModal from '@/components/Product/DeleteProductModal.vue';
    import ProductModal from '@/components/Product/ProductModal.vue';
    import Pagination from '@/components/Pagination.vue';
    export default{
        data(){
            return{
                products:[],
                tempProduct:{
                },
                tempDelProductID:'',
                modalMode:'add',  // add or edit
                api:{
                     path:process.env.VUE_APP_APIPATH,
                     privatePath:process.env.VUE_APP_API
                },
                pages:{}
            }
        },
        methods:{
            getProducts(page){
                this.$emitter.emit('updateLoadingStatus',true);
                const apiPath=this.api.path;
                const apiUrl=this.api.privatePath;
                const url=`${apiUrl}api/${apiPath}/admin/products?page=${page==null?1:page}`
                //console.log(url);
                this.axios.get(url).then(res=>{
                    console.log(res.data);
                    this.page=res.data.pagination.current_page;
                    this.pages=res.data.pagination;
                    this.products=res.data.products;
                }).finally(()=>{
                    this.$emitter.emit('updateLoadingStatus',false)
                })
            },
            edit(id){
                this.modalMode='edit';
                let p=this.products.find((item)=>{return item.id==id});
                this.tempProduct=JSON.parse(JSON.stringify(p));
                this.$refs.ProductModal.show();
            },
            add(){
                this.modalMode='add';
                this.tempProduct={};
                //console.log(this.$refs.productModal);
                this.$refs.ProductModal.show();
            },
            del(id){
                this.tempDelProductID=id;
                this.$refs.delProductMoal.show();
            }
        },
        created(){
            
            this.$emitter.on('updateProductSuccess',()=>{window.location.reload()});
            this.$emitter.on('deleteProductSuccess',(id)=>{
                let d=this.products.findIndex((item,index)=>{return item.id==id});
                this.products.splice(d,1);
            });
            this.getProducts();
            
        },
        components:{
    ProductModal,
    DeleteProductModal,
    Pagination
}
    }
</script>