<template>
    <!-- Button trigger modal -->
    <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
    </button> -->
    <!-- Modal -->
    <div ref="modal" class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <!-- 請同學自行新增 v-model -->
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <span>新增產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="mb-3">
                                <label for="image" class="form-label">輸入圖片網址</label>
                                <input type="text" class="form-control" id="image" placeholder="請輸入圖片連結">
                            </div>
                            <div class="mb-3">
                                <label for="customFile" class="form-label">或 上傳圖片
                                    <i class="fas fa-spinner fa-spin"></i>
                                </label>
                                <input ref="fileInput" type="file" id="customFile"
                                    class="form-control">
                            </div>
                            <img class="img-fluid" alt="">
                            <!-- 延伸技巧，多圖 -->
                            <div class="mt-5">
                                <div class="mb-3 input-group">
                                    <input type="url" class="form-control form-control" placeholder="請輸入連結">
                                    <button type="button" class="btn btn-outline-danger">
                                        移除
                                    </button>
                                </div>
                                <div>
                                    <button class="btn btn-outline-primary btn-sm d-block w-100">
                                        新增圖片
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="mb-3">
                                <label for="title" class="form-label">標題</label>
                                <input type="text" class="form-control" id="title" placeholder="請輸入標題"
                                    v-model="product.title">
                            </div>

                            <div class="row gx-2">
                                <div class="mb-3 col-md-6">
                                    <label for="category" class="form-label">分類</label>
                                    <input type="text" class="form-control" id="category" placeholder="請輸入分類"
                                        v-model="product.category">
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="price" class="form-label">單位</label>
                                    <input type="text" class="form-control" id="unit" placeholder="請輸入單位"
                                        v-model="product.unit">
                                </div>
                            </div>

                            <div class="row gx-2">
                                <div class="mb-3 col-md-6">
                                    <label for="origin_price" class="form-label">原價</label>
                                    <input type="number" class="form-control" id="origin_price" placeholder="請輸入原價"
                                        v-model="product.origin_price">
                                </div>
                                <div class="mb-3 col-md-6">
                                    <label for="price" class="form-label">售價</label>
                                    <input type="number" class="form-control" id="price" placeholder="請輸入售價"
                                        v-model="product.price">
                                </div>
                            </div>
                            <hr>

                            <div class="mb-3">
                                <label for="description" class="form-label">產品描述</label>
                                <textarea type="text" class="form-control" id="description" placeholder="請輸入產品描述"
                                    v-model="product.description"></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="content" class="form-label">說明內容</label>
                                <textarea type="text" class="form-control" id="content" placeholder="請輸入產品說明內容"
                                    v-model="product.content"></textarea>
                            </div>
                            <div class="mb-3">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" :true-value="1" :false-value="0"
                                        id="is_enabled" v-model="product.is_enabled">
                                    <label class="form-check-label" for="is_enabled">
                                        是否啟用
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">取消
                    </button>
                    <button type="button" @click.prevent="submit()" class="btn btn-primary">確認</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import Modal from 'bootstrap/js/dist/modal'
import modalMixin from '@/mixins/modalMixin';
export default {
    props: {
        propsProduct: {
            type: Object,
            default: {}
        },
        propsModalMode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            modal: {},
            product: {},
            modalMode: '',
        }
    },
    watch: {
        propsProduct(n, o) {
            this.product = JSON.parse(JSON.stringify(this.propsProduct));
            this.modalMode = this.propsModalMode;
        }
    },
    methods: {
        // show() {
        //     this.modal.show();
        // },
        // hide() {
        //     this.modal.hide();
        // },
        uploadfile() {
            let file = this.$refs.fileInput.files[0];
            let formData = new FormData();
            formData.append('file-to-upload', file);
            console.dir(file);
            const apiPath = process.env.VUE_APP_APIPATH;
            const apiUrl = process.env.VUE_APP_API;
            const url = `${apiUrl}api/${apiPath}/admin/upload`;
            const promise=new Promise((resolve,reject)=>{
                if(this.$refs.fileInput.files.length==0) resolve(null);
                this.$emitter.emit('updateLoadingStatus',true);
                this.axios.post(url,formData).then(res=>{                 
                    if(res.data.success)
                    {
                        alert('上傳照片成功');
                        resolve(res.data.imageUrl);
                    }
                    else
                    {
                        alert('上傳失敗');
                        console.log(res);
                        reject('上傳失敗');
                    };
                }).catch(err=>{
                    alert('上傳圖片時發生錯誤');
                    console.log(err);
                    reject('上傳圖片時發生錯誤');
                }).finally(()=>{
                    this.$emitter.emit('updateLoadingStatus',false);
                });
            })
            return promise;
        },
        submit() { //uploadfile(上傳圖片)確認ok之後，拿到回傳的url，再uploadProduct(上傳商品資訊)
            this.hide();
            this.uploadfile().then(imageUrl=>{
                if(imageUrl!=null) this.product.imageUrl=imageUrl
                this.uploadProduct();
            }).catch(err=>{
                alert('上傳產品資訊時發生錯誤');
                console.log(err);
            }).finally(()=>{
                this.$emitter.emit('updateLoadingStatus',true);
            })
        },
        uploadProduct(){
            const apiPath = process.env.VUE_APP_APIPATH;
            const apiUrl = process.env.VUE_APP_API;
            if (this.modalMode == 'add') {
                const url = `${apiUrl}api/${apiPath}/admin/product?`;
                //console.log(data);
                this.axios.post(url, { data: this.product }).then(res => {
                    console.log(res);
                    if (res.data.success) {
                        alert('新增成功');
                        this.$emitter.emit('updateProductSuccess');
                    }
                    else {
                        alert('新增失敗');
                    }
                    this.modal.hide();
                    //document.location.reload();
                }).catch(err => {
                    alert('發生錯誤');
                    console.log(err);
                });
            }
            else if (this.modalMode == 'edit') {
                const url = `${apiUrl}api/${apiPath}/admin/product/${this.product.id}`;
                this.axios.put(url, { data: this.product }).then(res => {
                    console.log(res);
                    if (res.data.success) {
                        alert('修改成功');
                        this.$emitter.emit('updateProductSuccess');
                    }
                    else {
                        alert('修改失敗');
                    }
                    this.modal.hide();
                    //document.location.reload();
                }).catch(err => {
                    alert('發生錯誤');
                    console.log(err);
                });
            }
        }
    },
    mounted() {
        //this.modal = new Modal(this.$refs.modal);
        this.modalMode = this.propsModalMode;
        this.product = this.propsProduct;
    },
    mixins:[modalMixin]
}
</script>