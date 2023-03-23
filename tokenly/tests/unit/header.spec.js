import { shallowMount } from "@vue/test-utils"
import Header from "@/components/Header.vue"

const $t = () => {}

//Mocks tests for the header component
describe("Header.vue", () => {
  it("renders correctly", () => {

    const wrapper = shallowMount(Header, {
      global: {
        //Simulate the $t and $i18n properties
        mocks: {
          $t: (msg) => msg, 
          $i18n: { locale: "en" }, 
        },
      },
    })
    expect(wrapper.html()).toContain("<header>")
    expect(wrapper.html()).toContain("<nav")
  });
  
});