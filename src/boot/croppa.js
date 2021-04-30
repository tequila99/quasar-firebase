import Croppa from 'vue-croppa'
import 'vue-croppa/dist/vue-croppa.css'
export default async ({ Vue }) => {
  Vue.use(Croppa, { componentName: 'q-croppa' })
}
