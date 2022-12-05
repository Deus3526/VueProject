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
                        <span>確定要刪除嗎</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    確定要刪除
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
        propsProductID: {
            default:'-1'
        },
    },
    data() {
        return {
            productID:''
        }
    },
    watch: {
        propsProductID(n, o) {
            this.productID=this.propsProductID;
        }
    },
    methods:{
        submit(){
            const apiPath = process.env.VUE_APP_APIPATH;
            const apiUrl = process.env.VUE_APP_API;
            //this.productID=-1;
            const url = `${apiUrl}api/${apiPath}/admin/product/${this.productID}`;
            this.axios.delete(url).then(res=>{
                console.log(res);
                alert(res.data.message); //已刪除產品 or 找不到產品
                if(res.data.success==true){
                    this.$emitter.emit('deleteProductSuccess',this.productID);
                }
                this.modal.hide();
            })
            .catch(err=>console.log(err));
        }
    },
    mounted() {
        //this.modal = new Modal(this.$refs.modal);
        this.productID=this.propsProductID;
    },
    mixins:[modalMixin]
}
</script>