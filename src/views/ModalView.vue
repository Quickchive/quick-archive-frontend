<template>
  <div class="overlay" v-if="modalViewStore.overlay"></div>
  <div class="modal-view">
    <!-- 카테고리 모달 -->
    <modal-select-category-or-content
      v-if="modalViewStore.selectModal"
    ></modal-select-category-or-content>
    <!-- 카테고리 추가 모달 -->
    <modal-category-add
      :modalTitle="modalAddCategory"
      :closeModal="closeAddCategoryModal"
      :apiName="addCategory"
      v-if="modalViewStore.addCategoryModal"
    ></modal-category-add>
    <modal-category-select v-if="modalViewStore.selectCategoryModal"></modal-category-select>

    <!-- 콘텐츠 추가 & 카테고리 추가 공통 사용: 카테고리 지정 모달 -->
    <modal-set-category-location
      v-if="modalViewStore.categoryLocationModal"
    ></modal-set-category-location>

    <!-- 카테고리 수정 모달 -->
    <modal-category-add
      :modalTitle="modalEditCategory"
      :closeModal="closeEditCategoryModal"
      :apiName="editCategory"
      v-if="modalViewStore.editCategoryModal"
    ></modal-category-add>

    <!-- 콘텐츠 모달 -->
    <modal-content-add-step-01 v-if="modalViewStore.addContentModal"></modal-content-add-step-01>
    <modal-content-add-step-02
      v-if="modalViewStore.addContentDetailModal"
    ></modal-content-add-step-02>
    <modal-edit-content-title
      v-if="modalViewStore.editContentTitleModal"
    ></modal-edit-content-title>
    <alert-confirm
      v-if="modalViewStore.deleteCategoryModal"
      :message="message"
      :closeModal="closeDeleteCategoryModal"
      :confirm="deleteCategory"
      :checkbox="checkbox"
      :confirmButtonMessage="confirmButtonMessage"
      :closeButtonMessage="closeButtonMessage"
    ></alert-confirm>
  </div>
  <div class="alert-overlay" v-if="modalViewStore.alertOverlay"></div>
  <div class="alert-view" v-if="modalViewStore.alertModal">
    <!-- 얼럿 모달 -->
    <alert-duplicated-category></alert-duplicated-category>
  </div>
</template>

<script setup>
import ModalCategoryAdd from '@/components/modal/category/ModalCategoryAdd.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalViewStore } from '@/stores/useModalViewStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import ModalCategorySelect from '@/components/modal/category/ModalCategorySelect.vue'
import ModalSetCategoryLocation from '@/components/modal/category/ModalSetCategoryLocation.vue'
import ModalContentAddStep01 from '@/components/modal/content/ModalContentAddStep01.vue'
import ModalContentAddStep02 from '@/components/modal/content/ModalContentAddStep02.vue'
import AlertDuplicatedCategory from '@/components/modal/alert/AlertDuplicatedCategory.vue'
import AlertConfirm from '@/components/modal/alert/AlertConfirm.vue'
import ModalEditContentTitle from '@/components/modal/content/ModalEditContentTitle.vue'

const modalAddCategory = '카테고리 추가'
const modalEditCategory = '카테고리 수정'

// confirmModal props
const message = '카테고리를 삭제할까요?'
const checkbox = true
const closeButtonMessage = '닫기'
const confirmButtonMessage = '삭제'

// counter store 가져오기
const modalViewStore = useModalViewStore()
const categoryStore = useCategoryStore()

const closeAddCategoryModal = () => {
  modalViewStore.closeAddCategoryModal()
}

const closeEditCategoryModal = () => {
  modalViewStore.closeEditCategoryModal()
}

const addCategory = 'addCategory'
const editCategory = 'editCategory'

const closeDeleteCategoryModal = () => {
  modalViewStore.closeDeleteCategoryModal()
}

const deleteCategory = () => {
  categoryStore.deleteCategory()
}
</script>

<style></style>
