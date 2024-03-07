<template>
  <div class="overlay" v-if="modalViewStore.overlay.default"></div>
  <div class="modal-view" v-if="modalViewStore.overlay.default">
    <!-- 카테고리 모달 -->
    <modal-select-category-or-content
      v-if="modalViewStore.modal.select"
    ></modal-select-category-or-content>
    <!-- 카테고리 추가 모달 -->
    <modal-category-add
      :apiName="'addCategory'"
      v-if="modalViewStore.modal.addCategory"
    ></modal-category-add>
    <modal-category-select v-if="modalViewStore.modal.selectCategory"></modal-category-select>

    <!-- 콘텐츠 추가 & 카테고리 추가 공통 사용: 카테고리 지정 모달 -->
    <modal-set-category-location
      v-if="modalViewStore.modal.categoryLocation"
    ></modal-set-category-location>

    <!-- 카테고리 수정 모달 -->
    <modal-category-add
      :apiName="'editCategory'"
      v-if="modalViewStore.modal.editCategory"
    ></modal-category-add>

    <!-- 콘텐츠 모달 -->
    <modal-content-add-step-01
      v-if="modalViewStore.modal.addContent"
      :closeModal="closeAddContentStep01Modal"
      :modalTitle="'콘텐츠 추가'"
    ></modal-content-add-step-01>
    <!-- 콘텐츠 추가 - 단일 링크 -->
    <modal-content-add-single
      v-if="modalViewStore.modal.addContentDetail"
      :closeModal="modalViewStore.closeAddContentSingle"
      :modalTitle="'콘텐츠 추가'"
    ></modal-content-add-single>
    <!-- 콘텐츠 추가 - 다중 링크 -->
    <modal-content-add-multiple
      v-if="modalViewStore.modal.addContentMultiple"
      :closeModal="modalViewStore.closeAddContentMultiple"
      :modalTitle="'콘텐츠 추가'"
    ></modal-content-add-multiple>
    <modal-edit-content-title
      v-if="modalViewStore.modal.editContentTitle"
      :index="index"
    ></modal-edit-content-title>
    <alert-confirm
      v-if="modalViewStore.modal.deleteCategory"
      :alertData="alertDataStore.deleteCategoryAlertData"
    ></alert-confirm>

    <!-- 콘텐츠 수정 모달 -->
    <modal-content-add-step-01
      v-if="modalViewStore.modal.editContent"
      :modalTitle="'콘텐츠 수정'"
      :closeModal="closeEditContentStep01Modal"
    ></modal-content-add-step-01>
    <modal-content-add-single
      v-if="modalViewStore.modal.editContentDetail"
      :modalTitle="'콘텐츠 수정'"
      :closeModal="closeEditContentSingle"
    ></modal-content-add-single>

    <!-- 콘텐츠 삭제 얼럿 -->
    <alert-confirm
      v-if="modalViewStore.modal.deleteContent"
      :alertData="alertDataStore.deleteContentAlertData"
    ></alert-confirm>

    <!-- 콘텐츠 공유 얼럿 -->
    <modal-content-share v-if="modalViewStore.modal.shareContent"></modal-content-share>

    <!-- 새 카테고리 추가 얼럿 -->
    <alert-with-input
      v-if="modalViewStore.modal.addNewCategory"
      :alertData="alertDataStore.addNewCategoryAlertData"
    ></alert-with-input>
    <!-- 새 카테고리 추가 완료 얼럿 -->
    <alert-with-input
      v-if="modalViewStore.modal.completeAddNewCategory"
      :alertData="alertDataStore.completeAddCategoryAlertData"
    ></alert-with-input>
  </div>
  <div class="alert-overlay" v-if="modalViewStore.overlay.alert"></div>
  <div class="alert-view" v-if="modalViewStore.modal.alert">
    <!-- 얼럿 모달 -->
    <alert-default></alert-default>
  </div>
</template>

<script setup>
import ModalCategoryAdd from '@/components/modal/category/ModalCategoryAdd.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import ModalCategorySelect from '@/components/modal/category/ModalCategorySelect.vue'
import ModalSetCategoryLocation from '@/components/modal/category/ModalSetCategoryLocation.vue'
import ModalContentAddStep01 from '@/components/modal/content/ModalContentAddStep01.vue'
import ModalContentAddSingle from '@/components/modal/content/ModalContentAddSingle.vue'
import ModalContentAddMultiple from '@/components/modal/content/ModalContentAddMultiple.vue'
import AlertDefault from '@/components/modal/alert/AlertDefault.vue'
import AlertConfirm from '@/components/modal/alert/AlertConfirm.vue'
import ModalEditContentTitle from '@/components/modal/content/ModalEditContentTitle.vue'
import AlertWithInput from '@/components/modal/alert/AlertWithInput.vue'
import ModalContentShare from '@/components/modal/content/ModalContentShare.vue'

const modalViewStore = useModalViewStore()
const alertDataStore = useAlertDataStore()

const closeAddContentStep01Modal = () => {
  modalViewStore.closeAddContentModal()
}

const closeEditContentStep01Modal = () => {
  modalViewStore.hideModalWithOverlay('editContent')
}

const closeEditContentSingle = () => {
  modalViewStore.hideModalWithOverlay('editContentDetail')
  modalViewStore.hideModalWithOverlay('editContent')
}
</script>

<style></style>
