<template>
	<div>
		<typeNav />
		<div class="main">
			<div class="py-container">
				<!--bread-->
				<div class="bread">
					<ul class="fl sui-breadcrumb">
						<li>
							<a href="#">全部结果</a>
						</li>
					</ul>
					<ul class="fl sui-tag">
						<li class="with-x" v-if="searchParams.categoryName">
							{{ searchParams.categoryName
							}}<i @click="removeCategoryName">×</i>
						</li>
						<li class="with-x" v-if="searchParams.keyword">
							{{ searchParams.keyword
							}}<i @click="removeKeyworde">×</i>
						</li>
						<li class="with-x" v-if="searchParams.trademark">
							{{ searchParams.trademark.split(':')[1]
							}}<i @click="removeTrademark">×</i>
						</li>
						<li
							class="with-x"
							v-for="(attrValue, index) in searchParams.props"
							:key="index"
						>
							{{ attrValue.split(':')[1]
							}}<i @click="removeAttr(index)">×</i>
						</li>
					</ul>
				</div>
				<!--selector-->
				<SearchSelector
					@trademarkInfo="trademarkInfo"
					@attrInfo="attrInfo"
				/>
				<!--details-->
				<div class="details clearfix">
					<div class="sui-navbar">
						<div class="navbar-inner filter">
							<ul class="sui-nav">
								<li :class="{ active: isOne }" @click="changeOrder('1')">
									<a>
										综合
										<span v-show="isOne" class="iconfont" :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
									</a>
								</li>
								<li :class="{ active: isTwo }" @click="changeOrder('2')">
									<a>
										价格
										<span v-show="isTwo" class="iconfont" :class="{'icon-UP':isAsc,'icon-DOWN':isDesc}"></span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div class="goods-list">
						<ul class="yui3-g">
							<li
								class="yui3-u-1-5"
								v-for="good in goodsList"
								:key="good.id"
							>
								<div class="list-wrap">
									<div class="p-img">
                                        <router-link :to="`/detail/${good.id}`">
										<img :src="good.defaultImg"/>
                                        </router-link>
									</div>
									<div class="price">
										<strong>
											<em>¥</em>
											<i>{{ good.price }}</i>
										</strong>
									</div>
									<div class="attr">
										<a
											target="_blank"
											href="item.html"
											title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
											>{{ good.title }}</a
										>
									</div>
									<div class="commit">
										<i class="command"
											>已有<span>2000</span>人评价</i
										>
									</div>
									<div class="operate">
										<a
											href="success-cart.html"
											target="_blank"
											class="sui-btn btn-bordered btn-danger"
											>加入购物车</a
										>
										<a
											href="javascript:void(0);"
											class="sui-btn btn-bordered"
											>收藏</a
										>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SearchSelector from './SearchSelector'
import { mapGetters,mapState } from 'vuex';
export default {
	name: 'Search',
	data() {
		return {
			searchParams: {
				//产品相应的id
				category1Id: '',
				category2Id: '',
				category3Id: '',
				//产品的名字
				categoryName: '',
				//搜索的关键字
				keyword: '',
				//排序:初始状态应该是综合且降序
				order: '1:asc',
				//第几页
				pageNo: 1,
				//每一页展示条数
				pageSize: 10,
				//平台属性的操作
				props: [],
				//品牌
				trademark: '',
			},
		}
	},
	components: { SearchSelector },
	beforeMount() {
		Object.assign(this.searchParams, this.$route.query, this.$route.params)
	},
	mounted() {
		this.getData()
	},
	methods: {
		getData() {
			this.$store.dispatch('getSearchList', this.searchParams)
		},
		removeCategoryName() {
			this.searchParams.categoryName = undefined
			this.searchParams.category1Id = undefined
			this.searchParams.category2Id = undefined
			this.searchParams.category3Id = undefined
			this.getData()
			if (this.$route.params) {
				this.$router.push({
					name: 'search',
					parmas: this.$route.params,
				})
			} else {
				this.$router.push({ name: 'search' })
			}
		},
		removeKeyworde() {
			this.searchParams.keyword = undefined
			this.getData()
			this.$bus.$emit('clear')
			if (this.$route.query) {
				this.$router.push({ name: 'search', query: this.$route.query })
			}
		},
		removeTrademark() {
			this.searchParams.trademark = undefined
			this.getData()
		},
		trademarkInfo(trademark) {
			this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
			this.getData()
		},
		attrInfo(attr, attrValue) {
			let props = `${attr.attrid}:${attrValue}:${attr.attrName}`
			if (this.searchParams.props.indexOf(props) == -1)
				this.searchParams.props.push(props)
			this.getData()
		},
		removeAttr(index) {
			this.searchParams.props.splice(index, 1)
			this.getData()
		},
        changeOrder(flag){
            // let originOrder = this.searchParams.order;
            let originFlag = this.searchParams.order.split(":")[0];
            let originSort = this.searchParams.order.split(":")[1];
            let newOrder = "";
            if(flag == originFlag){
                newOrder = `${originFlag}:${originSort == "desc"?"asc":"desc"}`
            }else{
                newOrder = `${flag}:${"desc"}`
            }
            this.searchParams.order = newOrder;
            this.getData()
        },
        getPageNo(pageNo){
            this.searchParams.pageNo = pageNo;
            this.getData();
        }
	},
	computed: {
		...mapGetters(['goodsList']),
		isOne() {
			return this.searchParams.order.indexOf('1') != -1
		},
		isTwo() {
			return this.searchParams.order.indexOf('2') != -1
		},
        isAsc(){
            return this.searchParams.order.indexOf("asc") != -1;
        },
        isDesc(){
            return this.searchParams.order.indexOf("desc") != -1;
        },
        ...mapState({
            total:state=>state.search.searchList.total
        })
	},
	watch: {
		$route() {
			Object.assign(
				this.searchParams,
				this.$route.query,
				this.$route.params
			)
			this.getData()
			this.searchParams.category1Id = undefined
			this.searchParams.category2Id = undefined
			this.searchParams.category3Id = undefined
		},
	},
}
</script>

<style scoped>
.main {
	margin: 10px 0;
}
.main .py-container {
	width: 1200px;
	margin: 0 auto;
}
.main .py-container .bread {
	margin-bottom: 5px;
	overflow: hidden;
}
.main .py-container .bread .sui-breadcrumb {
	padding: 3px 15px;
	margin: 0;
	font-weight: 400;
	border-radius: 3px;
	float: left;
}
.main .py-container .bread .sui-breadcrumb li {
	display: inline-block;
	line-height: 18px;
}
.main .py-container .bread .sui-breadcrumb li a {
	color: #666;
	text-decoration: none;
}
.main .py-container .bread .sui-breadcrumb li a:hover {
	color: #4cb9fc;
}
.main .py-container .bread .sui-tag {
	margin-top: -5px;
	list-style: none;
	font-size: 0;
	line-height: 0;
	padding: 5px 0 0;
	margin-bottom: 18px;
	float: left;
}
.main .py-container .bread .sui-tag .with-x {
	font-size: 12px;
	margin: 0 5px 5px 0;
	display: inline-block;
	overflow: hidden;
	color: #000;
	background: #f7f7f7;
	padding: 0 7px;
	height: 20px;
	line-height: 20px;
	border: 1px solid #dedede;
	white-space: nowrap;
	transition: color 400ms;
	cursor: pointer;
}
.main .py-container .bread .sui-tag .with-x i {
	margin-left: 10px;
	cursor: pointer;
	font: 400 14px tahoma;
	display: inline-block;
	height: 100%;
	vertical-align: middle;
}
.main .py-container .bread .sui-tag .with-x:hover {
	color: #28a3ef;
}
.main .py-container .details {
	margin-bottom: 5px;
}
.main .py-container .details .sui-navbar {
	overflow: visible;
	margin-bottom: 0;
}
.main .py-container .details .sui-navbar .filter {
	min-height: 40px;
	padding-right: 20px;
	background: #fbfbfb;
	border: 1px solid #e2e2e2;
	padding-left: 0;
	border-radius: 0;
	box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
}
.main .py-container .details .sui-navbar .filter .sui-nav {
	position: relative;
	left: 0;
	display: block;
	float: left;
	margin: 0 10px 0 0;
}
.main .py-container .details .sui-navbar .filter .sui-nav li {
	float: left;
	line-height: 18px;
}
.main .py-container .details .sui-navbar .filter .sui-nav li a {
	display: block;
	cursor: pointer;
	padding: 11px 15px;
	color: #777;
	text-decoration: none;
}
.main .py-container .details .sui-navbar .filter .sui-nav li.active a {
	background: #e1251b;
	color: #fff;
}
.main .py-container .details .goods-list {
	margin: 20px 0;
}
.main .py-container .details .goods-list ul {
	display: flex;
	flex-wrap: wrap;
}
.main .py-container .details .goods-list ul li {
	height: 100%;
	width: 20%;
	margin-top: 10px;
	line-height: 28px;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img {
	padding-left: 15px;
	width: 215px;
	height: 255px;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img a {
	color: #666;
}
.main .py-container .details .goods-list ul li .list-wrap .p-img a img {
	max-width: 100%;
	height: auto;
	vertical-align: middle;
}
.main .py-container .details .goods-list ul li .list-wrap .price {
	padding-left: 15px;
	font-size: 18px;
	color: #c81623;
}
.main .py-container .details .goods-list ul li .list-wrap .price strong {
	font-weight: 700;
}

.main .py-container .details .goods-list ul li .list-wrap .attr {
	padding-left: 15px;
	width: 85%;
	overflow: hidden;
	margin-bottom: 8px;
	min-height: 38px;
	cursor: pointer;
	line-height: 1.8;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
.main .py-container .details .goods-list ul li .list-wrap .attr a {
	color: #333;
	text-decoration: none;
}
.main .py-container .details .goods-list ul li .list-wrap .commit {
	padding-left: 15px;
	height: 22px;
	font-size: 13px;
	color: #a7a7a7;
}
.main .py-container .details .goods-list ul li .list-wrap .commit span {
	font-weight: 700;
	color: #646fb0;
}
.main .py-container .details .goods-list ul li .list-wrap .operate {
	padding: 12px 15px;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .sui-btn {
	display: inline-block;
	padding: 2px 14px;
	box-sizing: border-box;
	margin-bottom: 0;
	font-size: 12px;
	line-height: 18px;
	text-align: center;
	vertical-align: middle;
	cursor: pointer;
	border-radius: 0;
	background-color: transparent;
	margin-right: 15px;
}
.main
	.py-container
	.details
	.goods-list
	ul
	li
	.list-wrap
	.operate
	.btn-bordered {
	min-width: 85px;
	background-color: transparent;
	border: 1px solid #8c8c8c;
	color: #8c8c8c;
}
.main
	.py-container
	.details
	.goods-list
	ul
	li
	.list-wrap
	.operate
	.btn-bordered:hover {
	border: 1px solid #666;
	color: #fff !important;
	background-color: #666;
	text-decoration: none;
}
.main .py-container .details .goods-list ul li .list-wrap .operate .btn-danger {
	border: 1px solid #e1251b;
	color: #e1251b;
}
.main
	.py-container
	.details
	.goods-list
	ul
	li
	.list-wrap
	.operate
	.btn-danger:hover {
	border: 1px solid #e1251b;
	background-color: #e1251b;
	color: white !important;
	text-decoration: none;
}
.main .py-container .details .page {
	width: 733px;
	height: 66px;
	overflow: hidden;
	float: right;
}

</style>
