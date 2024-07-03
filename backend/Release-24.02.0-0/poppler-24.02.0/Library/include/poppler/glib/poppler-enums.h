
/* This file is generated by glib-mkenums, do not modify it. This code is licensed under the same license as the containing project. Note that it links to GLib, so must comply with the LGPL linking clauses. */


#ifndef POPPLER_ENUMS_H
#define POPPLER_ENUMS_H

#include <glib-object.h>

#include "poppler.h"

G_BEGIN_DECLS

/* enumerations from "poppler-action.h" */
POPPLER_PUBLIC
GType poppler_action_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ACTION_TYPE (poppler_action_type_get_type ())
POPPLER_PUBLIC
GType poppler_dest_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_DEST_TYPE (poppler_dest_type_get_type ())
POPPLER_PUBLIC
GType poppler_action_movie_operation_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ACTION_MOVIE_OPERATION (poppler_action_movie_operation_get_type ())
POPPLER_PUBLIC
GType poppler_action_layer_action_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ACTION_LAYER_ACTION (poppler_action_layer_action_get_type ())

/* enumerations from "poppler-annot.h" */
POPPLER_PUBLIC
GType poppler_annot_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_TYPE (poppler_annot_type_get_type ())
POPPLER_PUBLIC
GType poppler_annot_flag_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_FLAG (poppler_annot_flag_get_type ())
POPPLER_PUBLIC
GType poppler_annot_markup_reply_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_MARKUP_REPLY_TYPE (poppler_annot_markup_reply_type_get_type ())
POPPLER_PUBLIC
GType poppler_annot_external_data_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_EXTERNAL_DATA_TYPE (poppler_annot_external_data_type_get_type ())
POPPLER_PUBLIC
GType poppler_annot_text_state_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_TEXT_STATE (poppler_annot_text_state_get_type ())
POPPLER_PUBLIC
GType poppler_annot_free_text_quadding_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_FREE_TEXT_QUADDING (poppler_annot_free_text_quadding_get_type ())
POPPLER_PUBLIC
GType poppler_annot_stamp_icon_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ANNOT_STAMP_ICON (poppler_annot_stamp_icon_get_type ())

/* enumerations from "poppler-document.h" */
POPPLER_PUBLIC
GType poppler_page_layout_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PAGE_LAYOUT (poppler_page_layout_get_type ())
POPPLER_PUBLIC
GType poppler_page_mode_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PAGE_MODE (poppler_page_mode_get_type ())
POPPLER_PUBLIC
GType poppler_font_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_FONT_TYPE (poppler_font_type_get_type ())
POPPLER_PUBLIC
GType poppler_viewer_preferences_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_VIEWER_PREFERENCES (poppler_viewer_preferences_get_type ())
POPPLER_PUBLIC
GType poppler_print_scaling_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PRINT_SCALING (poppler_print_scaling_get_type ())
POPPLER_PUBLIC
GType poppler_print_duplex_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PRINT_DUPLEX (poppler_print_duplex_get_type ())
POPPLER_PUBLIC
GType poppler_permissions_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PERMISSIONS (poppler_permissions_get_type ())
POPPLER_PUBLIC
GType poppler_pdf_subtype_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PDF_SUBTYPE (poppler_pdf_subtype_get_type ())
POPPLER_PUBLIC
GType poppler_pdf_part_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PDF_PART (poppler_pdf_part_get_type ())
POPPLER_PUBLIC
GType poppler_pdf_conformance_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PDF_CONFORMANCE (poppler_pdf_conformance_get_type ())

/* enumerations from "poppler-form-field.h" */
POPPLER_PUBLIC
GType poppler_signature_status_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_SIGNATURE_STATUS (poppler_signature_status_get_type ())
POPPLER_PUBLIC
GType poppler_certificate_status_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_CERTIFICATE_STATUS (poppler_certificate_status_get_type ())
POPPLER_PUBLIC
GType poppler_signature_validation_flags_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_SIGNATURE_VALIDATION_FLAGS (poppler_signature_validation_flags_get_type ())
POPPLER_PUBLIC
GType poppler_form_field_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_FORM_FIELD_TYPE (poppler_form_field_type_get_type ())
POPPLER_PUBLIC
GType poppler_form_button_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_FORM_BUTTON_TYPE (poppler_form_button_type_get_type ())
POPPLER_PUBLIC
GType poppler_form_text_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_FORM_TEXT_TYPE (poppler_form_text_type_get_type ())
POPPLER_PUBLIC
GType poppler_form_choice_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_FORM_CHOICE_TYPE (poppler_form_choice_type_get_type ())
POPPLER_PUBLIC
GType poppler_additional_action_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ADDITIONAL_ACTION_TYPE (poppler_additional_action_type_get_type ())

/* enumerations from "poppler-movie.h" */
POPPLER_PUBLIC
GType poppler_movie_play_mode_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_MOVIE_PLAY_MODE (poppler_movie_play_mode_get_type ())

/* enumerations from "poppler-structure-element.h" */
POPPLER_PUBLIC
GType poppler_structure_element_kind_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_ELEMENT_KIND (poppler_structure_element_kind_get_type ())
POPPLER_PUBLIC
GType poppler_structure_get_text_flags_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_GET_TEXT_FLAGS (poppler_structure_get_text_flags_get_type ())
POPPLER_PUBLIC
GType poppler_structure_placement_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_PLACEMENT (poppler_structure_placement_get_type ())
POPPLER_PUBLIC
GType poppler_structure_writing_mode_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_WRITING_MODE (poppler_structure_writing_mode_get_type ())
POPPLER_PUBLIC
GType poppler_structure_border_style_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_BORDER_STYLE (poppler_structure_border_style_get_type ())
POPPLER_PUBLIC
GType poppler_structure_text_align_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_TEXT_ALIGN (poppler_structure_text_align_get_type ())
POPPLER_PUBLIC
GType poppler_structure_block_align_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_BLOCK_ALIGN (poppler_structure_block_align_get_type ())
POPPLER_PUBLIC
GType poppler_structure_inline_align_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_INLINE_ALIGN (poppler_structure_inline_align_get_type ())
POPPLER_PUBLIC
GType poppler_structure_text_decoration_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_TEXT_DECORATION (poppler_structure_text_decoration_get_type ())
POPPLER_PUBLIC
GType poppler_structure_ruby_align_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_RUBY_ALIGN (poppler_structure_ruby_align_get_type ())
POPPLER_PUBLIC
GType poppler_structure_ruby_position_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_RUBY_POSITION (poppler_structure_ruby_position_get_type ())
POPPLER_PUBLIC
GType poppler_structure_glyph_orientation_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_GLYPH_ORIENTATION (poppler_structure_glyph_orientation_get_type ())
POPPLER_PUBLIC
GType poppler_structure_list_numbering_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_LIST_NUMBERING (poppler_structure_list_numbering_get_type ())
POPPLER_PUBLIC
GType poppler_structure_form_role_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_FORM_ROLE (poppler_structure_form_role_get_type ())
POPPLER_PUBLIC
GType poppler_structure_form_state_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_FORM_STATE (poppler_structure_form_state_get_type ())
POPPLER_PUBLIC
GType poppler_structure_table_scope_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_STRUCTURE_TABLE_SCOPE (poppler_structure_table_scope_get_type ())

/* enumerations from "poppler.h" */
POPPLER_PUBLIC
GType poppler_error_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_ERROR (poppler_error_get_type ())
POPPLER_PUBLIC
GType poppler_page_transition_type_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PAGE_TRANSITION_TYPE (poppler_page_transition_type_get_type ())
POPPLER_PUBLIC
GType poppler_page_transition_alignment_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PAGE_TRANSITION_ALIGNMENT (poppler_page_transition_alignment_get_type ())
POPPLER_PUBLIC
GType poppler_page_transition_direction_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PAGE_TRANSITION_DIRECTION (poppler_page_transition_direction_get_type ())
POPPLER_PUBLIC
GType poppler_selection_style_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_SELECTION_STYLE (poppler_selection_style_get_type ())
POPPLER_PUBLIC
GType poppler_print_flags_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_PRINT_FLAGS (poppler_print_flags_get_type ())
POPPLER_PUBLIC
GType poppler_find_flags_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_FIND_FLAGS (poppler_find_flags_get_type ())
POPPLER_PUBLIC
GType poppler_backend_get_type (void) G_GNUC_CONST;
#define POPPLER_TYPE_BACKEND (poppler_backend_get_type ())
G_END_DECLS

#endif /* !POPPLER_ENUMS_H */

/* Generated data ends here */

