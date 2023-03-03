const Helpers = {
  methods: {
    block(target, targetType = 'square-rotate') {
      let type = targetType;
      return this.$vs.loading({ target: '#' + target, text: 'Loading...', type });
    },
    successNotification(message) {
      this.$notify({
        title: "Important message",
        text: "Hello user!",
      });
    },
    errorNotification(message) {
      this.$notify({
        title: "Important message",
        text: "Hello user!",
      });
    },
  }
};
export default Helpers;
