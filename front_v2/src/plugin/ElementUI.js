import Vue from 'vue'
import {
    Button,
    Table,
    TableColumn,
    Tag,
    Loading,
    Pagination,
    Skeleton,
    SkeletonItem,
    Image,
    Icon,
    Message,
    MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Loading)
Vue.use(Pagination)
Vue.use(Skeleton)
Vue.use(SkeletonItem)
Vue.use(Image)
Vue.use(Icon)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox