<template>
    <div class="page">
        <div class="search-wrap">
            请输入宝贝名称
        </div>
        <div class="title">登录</div>
    </div>
</template>

<script>
export default {
    name: 'search',
    data() {
        return {

        }
    }
}
</script>

<style>
    .page{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.8);
    }
    .page .search-wrap {
        width: 80%;
    }
    .page .title {
        width: 20%;
    }
</style>