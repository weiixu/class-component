<template>
  <div class="Test">
    <input ref="input" v-model="count" />
    <button @click="increment">+1</button>
  </div>
</template>
<script lang="ts">
import { Vue, Options } from "vue-class-component";

// 下面的@log装饰器，可以起到输出日志的作用。
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log(`编译 log:`, target, propertyKey, descriptor);
  const oldValue = descriptor.value;
  descriptor.value = function(...args: []) {
    console.log(`调用 log ${propertyKey}:`, this, args);
    return oldValue.apply(this, args);
  };
  return descriptor;
}

class Math {
  @log
  add(a: number, b: number): number {
    return a + b;
  }
}

@Options({
  // 定义组件的选项
  watch: {
    count(value: number) {
      console.log(value);
      console.log("this:", this);
    },
  },
})
export default class Test extends Vue {
  // 构造函数
  count = 0;
  $refs!: {
    input: HTMLInputElement;
  };

  increment() {
    this.count++;
  }
  beforeRouteEnter(to: any, from: any, next: any) {
    console.log("beforeRouteEnter");
    next();
  }
  beforeRouteLeave(to: any, from: any, next: any) {
    console.log("beforeRouteLeave");
    next();
  }
  mounted() {
    console.log("onMounted");
    const math = new Math();
    this.count = math.add(3, 2);
    this.$refs.input.focus();
  }
}

</script>
