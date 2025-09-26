<template>
  <div class="overlay" v-if="modalViewStore.overlay.default"></div>
  <div class="modal-view" v-if="modalViewStore.overlay.default">
    <!-- 카테고리 모달 -->
    <modal-select-category-or-content
      v-if="modalViewStore.modal.select"
    ></modal-select-category-or-content>
    <!-- 카테고리 추가 모달 -->
    <modal-category-add
      v-if="modalViewStore.modal.addCategory"
      :closeModal="closeModal"
    ></modal-category-add>
    <modal-category-select v-if="modalViewStore.modal.selectCategory"></modal-category-select>

    <!-- 카테고리 추가 시 사용: 카테고리 지정 모달(세부 카테고리까지 노출) -->
    <modal-set-category-location
      v-if="modalViewStore.modal.categoryLocation"
      :closeModal="gobackAddCategoryModal"
    ></modal-set-category-location>

    <!-- 단일 콘텐츠 추가 시 사용: 카테고리 지정 모달(세세부 카테고리까지 노출) -->
    <modal-set-category-location
      v-if="modalViewStore.modal.contentLocation"
      :closeModal="gobackAddContentModal"
    ></modal-set-category-location>

    <!-- 카테고리 수정 모달 -->
    <modal-category-edit v-if="modalViewStore.modal.editCategory"></modal-category-edit>

    <!-- 콘텐츠 추가 - 단일 링크 -->
    <modal-content-step-01
      v-if="modalViewStore.modal.addContent"
      :closeModal="closeModal"
      :modalTitle="'콘텐츠 추가'"
    ></modal-content-step-01>

    <!-- 로딩 바 모달 -->
    <modal-loader
      v-if="modalViewStore.modal.loader"
      :closeModal="closeLoader"
      :modalTitle="'콘텐츠 추가'"
    ></modal-loader>

    <modal-content-single
      v-if="modalViewStore.modal.addContentDetail"
      :closeModal="closeModal"
      :modalTitle="'콘텐츠 추가'"
      :goBack="gobackAddContentStep01"
    ></modal-content-single>

    <!-- 콘텐츠 추가 - 다중 링크 -->
    <modal-content-multiple
      v-if="modalViewStore.modal.addContentMultiple"
      :closeModal="closeModal"
      :modalTitle="'콘텐츠 추가'"
      :goBack="gobackAddContentStep01"
    ></modal-content-multiple>

    <!-- 콘텐츠 수정 모달 -->
    <modal-content-single
      v-if="modalViewStore.modal.editContentDetail"
      :modalTitle="'콘텐츠 수정'"
      :closeModal="closeEditContentSingle"
    ></modal-content-single>

    <alert-confirm
      v-if="modalViewStore.modal.deleteCategory"
      :alertData="alertDataStore.deleteCategoryAlertData"
    ></alert-confirm>

    <!-- 콘텐츠 삭제 얼럿 -->
    <alert-confirm
      v-if="modalViewStore.modal.deleteContent"
      :alertData="alertDataStore.deleteContentAlertData"
    ></alert-confirm>

    <!-- 콘텐츠 제목 수정 모달 -->
    <modal-edit-content-title
      v-if="modalViewStore.modal.editContentTitle"
    ></modal-edit-content-title>

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
import ModalCategoryEdit from '@/components/modal/category/ModalCategoryEdit.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useAlertDataStore } from '@/stores/useAlertDataStore.ts'
import { useSearchStore } from '@/stores/useSearchStore.ts'
import ModalCategorySelect from '@/components/modal/category/ModalCategorySelect.vue'
import ModalSetCategoryLocation from '@/components/modal/category/ModalSetCategoryLocation.vue'
import ModalContentStep01 from '@/components/modal/content/ModalContentAddStep01.vue'
import ModalContentSingle from '@/components/modal/content/ModalContentAddSingle.vue'
import ModalContentMultiple from '@/components/modal/content/ModalContentAddMultiple.vue'
import AlertDefault from '@/components/modal/alert/AlertDefault.vue'
import AlertConfirm from '@/components/modal/alert/AlertConfirm.vue'
import ModalEditContentTitle from '@/components/modal/content/ModalEditContentTitle.vue'
import AlertWithInput from '@/components/modal/alert/AlertWithInput.vue'
import ModalLoader from '@/components/modal/ModalLoader.vue'
const modalViewStore = useModalViewStore()
const alertDataStore = useAlertDataStore()
const searchStore = useSearchStore()

const closeEditContentSingle = () => {
  modalViewStore.resetAll()
}

const closeLoader = () => {
  modalViewStore.resetAll()
}

const gobackAddContentStep01 = () => {
  modalViewStore.hideModal('addContentDetail')
  modalViewStore.openAddContentModal()
}

const closeModal = () => {
  modalViewStore.resetAll()
}

const gobackAddCategoryModal = () => {
  searchStore.clearSearchModalInput()
  modalViewStore.hideModal('categoryLocation')
}

const gobackAddContentModal = () => {
  searchStore.clearSearchModalInput()
  modalViewStore.hideModal('contentLocation')
}
</script>

<style></style>
