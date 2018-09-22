<!-- template for the modal component -->
<template>
    <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">

            <div class="modal-header">
              <slot name="header"></slot>
            </div>

            <div class="modal-body">
              <slot name="body"></slot>
            </div>

            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
</template>

<style>
@import '../../styles/common/Modal.css';
</style>
