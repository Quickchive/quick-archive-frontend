<template>
  <div class="overlay" v-if="modalStore.overlay"></div>
  <div class="modal-view">
    <!-- 카테고리 모달 -->
    <modal-select-category-or-content
      v-if="modalStore.selectModal"
    ></modal-select-category-or-content>
    <!-- 카테고리 추가 모달 -->
    <modal-category-add
      :modalTitle="modalAddCategory"
      :closeModal="closeAddCategoryModal"
      :apiName="addCategory"
      v-if="modalStore.addCategoryModal"
    ></modal-category-add>
    <modal-category-select v-if="modalStore.selectCategoryModal"></modal-category-select>
    <modal-set-category-location
      v-if="modalStore.categoryLocationModal"
    ></modal-set-category-location>
    <!-- 카테고리 수정 모달 -->
    <modal-category-add
      :modalTitle="modalEditCategory"
      :closeModal="closeEditCategoryModal"
      :apiName="editCategory"
      v-if="modalStore.editCategoryModal"
    ></modal-category-add>

    <!-- 콘텐츠 모달 -->
    <modal-content-add v-if="modalStore.addContentModal"></modal-content-add>
    <modal-content-add-set-new-category
      v-if="modalStore.contentLocationModal"
    ></modal-content-add-set-new-category>
    <modal-content-add-step-02 v-if="modalStore.addContentDetailModal"></modal-content-add-step-02>
    <alert-confirm
      v-if="modalStore.deleteCategoryModal"
      :message="message"
      :closeModal="closeDeleteCategoryModal"
      :confirm="deleteCategory"
      :checkbox="checkbox"
      :confirmButtonMessage="confirmButtonMessage"
      :closeButtonMessage="closeButtonMessage"
    ></alert-confirm>
  </div>
  <div class="alert-overlay" v-if="modalStore.alertOverlay"></div>
  <div class="alert-view" v-if="modalStore.alertModal">
    <!-- 얼럿 모달 -->
    <alert-duplicated-category></alert-duplicated-category>
  </div>
</template>

<script setup>
import ModalCategoryAdd from '@/components/modal/category/ModalCategoryAdd.vue'
import ModalSelectCategoryOrContent from '@/components/modal/ModalSelectCategoryOrContent.vue'
import { useModalStore } from '@/stores/useModalStore.ts'
import { useCategoryStore } from '@/stores/useCategoryStore.ts'
import ModalCategorySelect from '@/components/modal/category/ModalCategorySelect.vue'
import ModalSetCategoryLocation from '@/components/modal/category/ModalSetCategoryLocation.vue'
import ModalContentAdd from '@/components/modal/content/ModalContentAdd.vue'
import ModalContentAddSetNewCategory from '@/components/modal/content/ModalContentAddSetNewCategory.vue'
import ModalContentAddStep02 from '@/components/modal/content/ModalContentAddStep02.vue'
import AlertDuplicatedCategory from '@/components/modal/alert/AlertDuplicatedCategory.vue'
import AlertConfirm from '@/components/modal/alert/AlertConfirm.vue'
import { addCategories, updateCategories } from '@/api/category.js'

const modalAddCategory = '카테고리 추가'
const modalEditCategory = '카테고리 수정'

// confirmModal props
const message = '카테고리를 삭제할까요?'
const checkbox = true
const closeButtonMessage = '닫기'
const confirmButtonMessage = '삭제'

// counter store 가져오기
const modalStore = useModalStore()
const categoryStore = useCategoryStore()

const closeAddCategoryModal = () => {
  modalStore.closeAddCategoryModal()
}

const closeEditCategoryModal = () => {
  modalStore.closeEditCategoryModal()
}

const addCategory = 'addCategory'
const editCategory = 'editCategory'

const closeDeleteCategoryModal = () => {
  modalStore.closeDeleteCategoryModal()
}

const deleteCategory = () => {
  categoryStore.deleteCategory()
}
</script>

<style></style>
