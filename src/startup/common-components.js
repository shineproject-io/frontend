import Vue from 'vue'
import commonComponents from '@/common';

commonComponents.forEach(component => {
    Vue.component(component.name, component);
});
