export default {
    computed: {
        allowDraggable() {
            if (screen.width < 768) {
                return false;
            }

            return true;
        }
    }
}