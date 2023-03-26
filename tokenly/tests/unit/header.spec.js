import { shallowMount } from "@vue/test-utils"
import Header from "@/components/Header.vue"

const $t = () => {}

//Mocks tests for the header component
describe("Header.vue", () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Header, {
      global: {
        mocks: {
          $t: (msg) => msg,
          $i18n: { locale: "en" },
        },
      },
    })
  })

  it("Renders header correctly", () => {
    expect(wrapper.html()).toContain("<header>")
    expect(wrapper.html()).toContain("<nav")
  })
  
  it("Displays navigation items", () => {
    console.log(wrapper.html())
    const navItems = wrapper.findAll("li")
    expect(navItems.length).toBeGreaterThan(0)
  })
});