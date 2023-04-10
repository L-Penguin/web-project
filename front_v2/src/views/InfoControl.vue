<template>
    <div id="infoControl">
        <h1>信息操作页面</h1>
        <div class="del-buttons">
            <el-button v-for="id in group_ids" type="primary" :key="id" @click="delInfo(id)" icon="el-icon-delete">{{ `删除${id}` }}</el-button>
        </div>
    </div>
</template>

<script>
import client from '../utils/client'

export default {
    name: "InfoControl",
    data() {
        return {
            group_ids: [],
        }
    },
    created() {
        client.getGroupButton((data) => {
            this.group_ids = data.map(obj => obj.group_id);
        })
    },
    methods: {
        delInfo(id) {
            this.$msgbox.confirm(`此操作将永久删除Group: ${id}信息, 是否继续?`, '警告', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                client.delInfoByGroupID(id, (data) => {
                    console.log(`affectedRows: ${data.affectedRows}`)
                }).then(()=> {
                    client.getGroupButton((data) => {
                        this.group_ids = data.map(obj => obj.group_id);
                    })
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            })
        }
    }
}
</script>

<style>
    .del-buttons {
        width: 80%;
        height: 70vh;
        margin: 0 auto;
        padding: 50px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        align-items: flex-start;
        /* align-content: space-around; */
    }
</style>