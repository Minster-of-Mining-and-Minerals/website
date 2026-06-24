--
-- PostgreSQL database dump
--

-- Dumped from database version 18.2
-- Dumped by pg_dump version 18.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.vacancies DROP CONSTRAINT IF EXISTS vacancies_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_user_type_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.tenders DROP CONSTRAINT IF EXISTS tenders_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.strategy_sections DROP CONSTRAINT IF EXISTS strategy_sections_strategy_id_fkey;
ALTER TABLE IF EXISTS ONLY public.strategy_sections DROP CONSTRAINT IF EXISTS strategy_sections_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.steps DROP CONSTRAINT IF EXISTS steps_process_step_id_fkey;
ALTER TABLE IF EXISTS ONLY public.steps DROP CONSTRAINT IF EXISTS steps_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_section DROP CONSTRAINT IF EXISTS snapshot_section_snapshot_id_fkey;
ALTER TABLE IF EXISTS ONLY public.snapshot DROP CONSTRAINT IF EXISTS snapshot_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.sliders DROP CONSTRAINT IF EXISTS sliders_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.routes DROP CONSTRAINT IF EXISTS routes_parent_id_fkey;
ALTER TABLE IF EXISTS ONLY public.route_translations DROP CONSTRAINT IF EXISTS route_translations_route_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_role_id_fkey;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_permission_id_fkey;
ALTER TABLE IF EXISTS ONLY public.resource_attachments DROP CONSTRAINT IF EXISTS resource_attachments_resource_id_fkey;
ALTER TABLE IF EXISTS ONLY public.resource_attachments DROP CONSTRAINT IF EXISTS resource_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.regional_office_contact_centers DROP CONSTRAINT IF EXISTS regional_office_contact_centers_region_id_fkey;
ALTER TABLE IF EXISTS ONLY public.process_steps DROP CONSTRAINT IF EXISTS process_steps_petroleum_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.process_blocks DROP CONSTRAINT IF EXISTS process_blocks_petroleum_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.process_block_attachments DROP CONSTRAINT IF EXISTS process_block_attachments_process_block_id_fkey;
ALTER TABLE IF EXISTS ONLY public.process_block_attachments DROP CONSTRAINT IF EXISTS process_block_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_regulation DROP CONSTRAINT IF EXISTS petroleum_regulation_petroleum_regulation_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_regulation_attachments DROP CONSTRAINT IF EXISTS petroleum_regulation_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_regulation_attachments DROP CONSTRAINT IF EXISTS petroleum_regulation_attachme_petroleum_regulation_process_fkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_directive DROP CONSTRAINT IF EXISTS petroleum_directive_petroleum_regulation_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_attachments DROP CONSTRAINT IF EXISTS petroleum_attachments_petroleum_objective_id_fkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_attachments DROP CONSTRAINT IF EXISTS petroleum_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.partner_attachments DROP CONSTRAINT IF EXISTS partner_attachments_partner_id_fkey;
ALTER TABLE IF EXISTS ONLY public.partner_attachments DROP CONSTRAINT IF EXISTS partner_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.objectives DROP CONSTRAINT IF EXISTS objectives_asm_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_tags DROP CONSTRAINT IF EXISTS news_tags_tag_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_tags DROP CONSTRAINT IF EXISTS news_tags_news_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_reads DROP CONSTRAINT IF EXISTS news_reads_news_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_reactions DROP CONSTRAINT IF EXISTS news_reactions_news_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_metadata DROP CONSTRAINT IF EXISTS news_metadata_news_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_feedbacks DROP CONSTRAINT IF EXISTS news_feedbacks_news_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_attachments DROP CONSTRAINT IF EXISTS news_attachments_news_id_fkey;
ALTER TABLE IF EXISTS ONLY public.news_attachments DROP CONSTRAINT IF EXISTS news_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_service DROP CONSTRAINT IF EXISTS mining_service_mining_regulation_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_service_card DROP CONSTRAINT IF EXISTS mining_service_card_mining_service_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline DROP CONSTRAINT IF EXISTS mining_guideline_mining_regulation_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline_content DROP CONSTRAINT IF EXISTS mining_guideline_content_mining_guideline_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline_attachments DROP CONSTRAINT IF EXISTS mining_guideline_attachments_mining_guideline_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline_attachments DROP CONSTRAINT IF EXISTS mining_guideline_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_framework DROP CONSTRAINT IF EXISTS mining_framework_mining_regulation_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_framework DROP CONSTRAINT IF EXISTS mining_framework_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_application_types DROP CONSTRAINT IF EXISTS mining_application_types_mining_application_process_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_application_process_attachments DROP CONSTRAINT IF EXISTS mining_application_process_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.mining_application_process_attachments DROP CONSTRAINT IF EXISTS mining_application_process_at_mining_application_process_i_fkey;
ALTER TABLE IF EXISTS ONLY public.licensing_contacts DROP CONSTRAINT IF EXISTS licensing_contacts_regional_office_id_fkey;
ALTER TABLE IF EXISTS ONLY public.leadership_attachments DROP CONSTRAINT IF EXISTS leadership_attachments_leadership_id_fkey;
ALTER TABLE IF EXISTS ONLY public.leadership_attachments DROP CONSTRAINT IF EXISTS leadership_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.investigation_strategy DROP CONSTRAINT IF EXISTS investigation_strategy_investigate_ethiopia_id_fkey;
ALTER TABLE IF EXISTS ONLY public.investigation_strategy DROP CONSTRAINT IF EXISTS investigation_strategy_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.investigation_action DROP CONSTRAINT IF EXISTS investigation_action_investigate_ethiopia_id_fkey;
ALTER TABLE IF EXISTS ONLY public.gamestones DROP CONSTRAINT IF EXISTS gamestones_parent_id_fkey;
ALTER TABLE IF EXISTS ONLY public.gamestones DROP CONSTRAINT IF EXISTS gamestones_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.gamestone_attachments DROP CONSTRAINT IF EXISTS gamestone_attachments_gamestone_id_fkey;
ALTER TABLE IF EXISTS ONLY public.gamestone_attachments DROP CONSTRAINT IF EXISTS gamestone_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.footers DROP CONSTRAINT IF EXISTS footers_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.footer_sections DROP CONSTRAINT IF EXISTS footer_sections_footer_id_fkey;
ALTER TABLE IF EXISTS ONLY public.events DROP CONSTRAINT IF EXISTS events_event_category_id_fkey;
ALTER TABLE IF EXISTS ONLY public.event_attachments DROP CONSTRAINT IF EXISTS event_attachments_event_id_fkey;
ALTER TABLE IF EXISTS ONLY public.event_attachments DROP CONSTRAINT IF EXISTS event_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.core_values DROP CONSTRAINT IF EXISTS core_values_section_id_fkey;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.background_attachments DROP CONSTRAINT IF EXISTS background_attachments_background_id_fkey;
ALTER TABLE IF EXISTS ONLY public.background_attachments DROP CONSTRAINT IF EXISTS background_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_user_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asm_previews DROP CONSTRAINT IF EXISTS asm_previews_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asm_previews DROP CONSTRAINT IF EXISTS asm_previews_asm_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asm_attachments DROP CONSTRAINT IF EXISTS asm_attachments_attachment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.asm_attachments DROP CONSTRAINT IF EXISTS asm_attachments_asm_id_fkey;
DROP INDEX IF EXISTS public.vacancies_status;
DROP INDEX IF EXISTS public.vacancies_deleted_at;
DROP INDEX IF EXISTS public.vacancies_application_deadline;
DROP INDEX IF EXISTS public.tenders_status;
DROP INDEX IF EXISTS public.tenders_deleted_at;
DROP INDEX IF EXISTS public.tenders_closing_date;
DROP INDEX IF EXISTS public.routes_path;
DROP INDEX IF EXISTS public.routes_parent_id;
DROP INDEX IF EXISTS public.routes_order;
DROP INDEX IF EXISTS public.routes_is_active;
DROP INDEX IF EXISTS public.route_translations_route_id;
DROP INDEX IF EXISTS public.route_translations_language_code;
DROP INDEX IF EXISTS public.resource_sector;
DROP INDEX IF EXISTS public.resource_deleted_at;
DROP INDEX IF EXISTS public.resource_created_at;
DROP INDEX IF EXISTS public.news_tags_news_id_tag_id;
DROP INDEX IF EXISTS public.news_reads_news_id_ip_address;
DROP INDEX IF EXISTS public.news_reactions_news_id_ip_address;
DROP INDEX IF EXISTS public.audit_logs_user_id;
DROP INDEX IF EXISTS public.audit_logs_model_name_record_id;
ALTER TABLE IF EXISTS ONLY public.vacancies DROP CONSTRAINT IF EXISTS vacancies_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_key;
ALTER TABLE IF EXISTS ONLY public.user_types DROP CONSTRAINT IF EXISTS user_types_pkey;
ALTER TABLE IF EXISTS ONLY public.user_types DROP CONSTRAINT IF EXISTS user_types_name_key;
ALTER TABLE IF EXISTS ONLY public.user_roles DROP CONSTRAINT IF EXISTS user_roles_pkey;
ALTER TABLE IF EXISTS ONLY public.route_translations DROP CONSTRAINT IF EXISTS unique_route_language;
ALTER TABLE IF EXISTS ONLY public.tenders DROP CONSTRAINT IF EXISTS tenders_pkey;
ALTER TABLE IF EXISTS ONLY public.tags DROP CONSTRAINT IF EXISTS tags_pkey;
ALTER TABLE IF EXISTS ONLY public.tags DROP CONSTRAINT IF EXISTS tags_name_key;
ALTER TABLE IF EXISTS ONLY public.strategy_sections DROP CONSTRAINT IF EXISTS strategy_sections_pkey;
ALTER TABLE IF EXISTS ONLY public.strategies DROP CONSTRAINT IF EXISTS strategies_pkey;
ALTER TABLE IF EXISTS ONLY public.steps DROP CONSTRAINT IF EXISTS steps_pkey;
ALTER TABLE IF EXISTS ONLY public.social_medias DROP CONSTRAINT IF EXISTS social_medias_url_key;
ALTER TABLE IF EXISTS ONLY public.social_medias DROP CONSTRAINT IF EXISTS social_medias_platform_name_key;
ALTER TABLE IF EXISTS ONLY public.social_medias DROP CONSTRAINT IF EXISTS social_medias_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot_section DROP CONSTRAINT IF EXISTS snapshot_section_pkey;
ALTER TABLE IF EXISTS ONLY public.snapshot DROP CONSTRAINT IF EXISTS snapshot_pkey;
ALTER TABLE IF EXISTS ONLY public.sliders DROP CONSTRAINT IF EXISTS sliders_pkey;
ALTER TABLE IF EXISTS ONLY public.services DROP CONSTRAINT IF EXISTS services_title_key;
ALTER TABLE IF EXISTS ONLY public.services DROP CONSTRAINT IF EXISTS services_pkey;
ALTER TABLE IF EXISTS ONLY public.routes DROP CONSTRAINT IF EXISTS routes_pkey;
ALTER TABLE IF EXISTS ONLY public.route_translations DROP CONSTRAINT IF EXISTS route_translations_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_pkey;
ALTER TABLE IF EXISTS ONLY public.roles DROP CONSTRAINT IF EXISTS roles_name_key;
ALTER TABLE IF EXISTS ONLY public.role_permissions DROP CONSTRAINT IF EXISTS role_permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.resource DROP CONSTRAINT IF EXISTS resource_pkey;
ALTER TABLE IF EXISTS ONLY public.resource_attachments DROP CONSTRAINT IF EXISTS resource_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.regions DROP CONSTRAINT IF EXISTS regions_pkey;
ALTER TABLE IF EXISTS ONLY public.regions DROP CONSTRAINT IF EXISTS regions_code_key;
ALTER TABLE IF EXISTS ONLY public.regional_office_contact_centers DROP CONSTRAINT IF EXISTS regional_office_contact_centers_pkey;
ALTER TABLE IF EXISTS ONLY public.process_steps DROP CONSTRAINT IF EXISTS process_steps_pkey;
ALTER TABLE IF EXISTS ONLY public.process_blocks DROP CONSTRAINT IF EXISTS process_blocks_pkey;
ALTER TABLE IF EXISTS ONLY public.process_block_attachments DROP CONSTRAINT IF EXISTS process_block_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_regulation_process DROP CONSTRAINT IF EXISTS petroleum_regulation_process_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_regulation DROP CONSTRAINT IF EXISTS petroleum_regulation_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_regulation_attachments DROP CONSTRAINT IF EXISTS petroleum_regulation_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_processes DROP CONSTRAINT IF EXISTS petroleum_processes_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_objective DROP CONSTRAINT IF EXISTS petroleum_objective_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_directive DROP CONSTRAINT IF EXISTS petroleum_directive_pkey;
ALTER TABLE IF EXISTS ONLY public.petroleum_attachments DROP CONSTRAINT IF EXISTS petroleum_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.permissions DROP CONSTRAINT IF EXISTS permissions_resource_action_unique;
ALTER TABLE IF EXISTS ONLY public.permissions DROP CONSTRAINT IF EXISTS permissions_pkey;
ALTER TABLE IF EXISTS ONLY public.partners DROP CONSTRAINT IF EXISTS partners_pkey;
ALTER TABLE IF EXISTS ONLY public.partner_attachments DROP CONSTRAINT IF EXISTS partner_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.objectives DROP CONSTRAINT IF EXISTS objectives_pkey;
ALTER TABLE IF EXISTS ONLY public.news_tags DROP CONSTRAINT IF EXISTS news_tags_pkey;
ALTER TABLE IF EXISTS ONLY public.news_reads DROP CONSTRAINT IF EXISTS news_reads_pkey;
ALTER TABLE IF EXISTS ONLY public.news_reactions DROP CONSTRAINT IF EXISTS news_reactions_pkey;
ALTER TABLE IF EXISTS ONLY public.news DROP CONSTRAINT IF EXISTS news_pkey;
ALTER TABLE IF EXISTS ONLY public.news_metadata DROP CONSTRAINT IF EXISTS news_metadata_pkey;
ALTER TABLE IF EXISTS ONLY public.news_metadata DROP CONSTRAINT IF EXISTS news_metadata_news_id_key;
ALTER TABLE IF EXISTS ONLY public.news_feedbacks DROP CONSTRAINT IF EXISTS news_feedbacks_pkey;
ALTER TABLE IF EXISTS ONLY public.news_attachments DROP CONSTRAINT IF EXISTS news_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_service DROP CONSTRAINT IF EXISTS mining_service_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_service_card DROP CONSTRAINT IF EXISTS mining_service_card_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_regulation_process DROP CONSTRAINT IF EXISTS mining_regulation_process_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline DROP CONSTRAINT IF EXISTS mining_guideline_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline_content DROP CONSTRAINT IF EXISTS mining_guideline_content_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_guideline_attachments DROP CONSTRAINT IF EXISTS mining_guideline_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_framework DROP CONSTRAINT IF EXISTS mining_framework_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_application_types DROP CONSTRAINT IF EXISTS mining_application_types_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_application_process DROP CONSTRAINT IF EXISTS mining_application_process_pkey;
ALTER TABLE IF EXISTS ONLY public.mining_application_process_attachments DROP CONSTRAINT IF EXISTS mining_application_process_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS ONLY public.licensing_contacts DROP CONSTRAINT IF EXISTS licensing_contacts_pkey;
ALTER TABLE IF EXISTS ONLY public.leadership DROP CONSTRAINT IF EXISTS leadership_pkey;
ALTER TABLE IF EXISTS ONLY public.leadership DROP CONSTRAINT IF EXISTS leadership_name_key;
ALTER TABLE IF EXISTS ONLY public.leadership_attachments DROP CONSTRAINT IF EXISTS leadership_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.investigation_strategy DROP CONSTRAINT IF EXISTS investigation_strategy_pkey;
ALTER TABLE IF EXISTS ONLY public.investigation_action DROP CONSTRAINT IF EXISTS investigation_action_pkey;
ALTER TABLE IF EXISTS ONLY public.investigate_ethiopia DROP CONSTRAINT IF EXISTS investigate_ethiopia_pkey;
ALTER TABLE IF EXISTS ONLY public.gamestones DROP CONSTRAINT IF EXISTS gamestones_pkey;
ALTER TABLE IF EXISTS ONLY public.gamestone_attachments DROP CONSTRAINT IF EXISTS gamestone_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.footers DROP CONSTRAINT IF EXISTS footers_pkey;
ALTER TABLE IF EXISTS ONLY public.footer_sections DROP CONSTRAINT IF EXISTS footer_sections_pkey;
ALTER TABLE IF EXISTS ONLY public.federal_office_contacts DROP CONSTRAINT IF EXISTS federal_office_contacts_pkey;
ALTER TABLE IF EXISTS ONLY public.events DROP CONSTRAINT IF EXISTS events_pkey;
ALTER TABLE IF EXISTS ONLY public.event_categories DROP CONSTRAINT IF EXISTS event_categories_pkey;
ALTER TABLE IF EXISTS ONLY public.event_categories DROP CONSTRAINT IF EXISTS event_categories_name_key;
ALTER TABLE IF EXISTS ONLY public.event_attachments DROP CONSTRAINT IF EXISTS event_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.core_values DROP CONSTRAINT IF EXISTS core_values_pkey;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS cards_pkey;
ALTER TABLE IF EXISTS ONLY public.backgrounds DROP CONSTRAINT IF EXISTS backgrounds_pkey;
ALTER TABLE IF EXISTS ONLY public.background_attachments DROP CONSTRAINT IF EXISTS background_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.audit_logs DROP CONSTRAINT IF EXISTS audit_logs_pkey;
ALTER TABLE IF EXISTS ONLY public.attachments DROP CONSTRAINT IF EXISTS attachments_pkey;
ALTER TABLE IF EXISTS ONLY public.asm_previews DROP CONSTRAINT IF EXISTS asm_previews_pkey;
ALTER TABLE IF EXISTS ONLY public.asm DROP CONSTRAINT IF EXISTS asm_pkey;
ALTER TABLE IF EXISTS ONLY public.asm_attachments DROP CONSTRAINT IF EXISTS asm_attachments_pkey;
ALTER TABLE IF EXISTS ONLY public."SequelizeMeta" DROP CONSTRAINT IF EXISTS "SequelizeMeta_pkey";
DROP TABLE IF EXISTS public.vacancies;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_types;
DROP TABLE IF EXISTS public.user_roles;
DROP TABLE IF EXISTS public.tenders;
DROP TABLE IF EXISTS public.tags;
DROP TABLE IF EXISTS public.strategy_sections;
DROP TABLE IF EXISTS public.strategies;
DROP TABLE IF EXISTS public.steps;
DROP TABLE IF EXISTS public.social_medias;
DROP TABLE IF EXISTS public.snapshot_section;
DROP TABLE IF EXISTS public.snapshot;
DROP TABLE IF EXISTS public.sliders;
DROP TABLE IF EXISTS public.services;
DROP TABLE IF EXISTS public.routes;
DROP TABLE IF EXISTS public.route_translations;
DROP TABLE IF EXISTS public.roles;
DROP TABLE IF EXISTS public.role_permissions;
DROP TABLE IF EXISTS public.resource_attachments;
DROP TABLE IF EXISTS public.resource;
DROP TABLE IF EXISTS public.regions;
DROP TABLE IF EXISTS public.regional_office_contact_centers;
DROP TABLE IF EXISTS public.process_steps;
DROP TABLE IF EXISTS public.process_blocks;
DROP TABLE IF EXISTS public.process_block_attachments;
DROP TABLE IF EXISTS public.petroleum_regulation_process;
DROP TABLE IF EXISTS public.petroleum_regulation_attachments;
DROP TABLE IF EXISTS public.petroleum_regulation;
DROP TABLE IF EXISTS public.petroleum_processes;
DROP TABLE IF EXISTS public.petroleum_objective;
DROP TABLE IF EXISTS public.petroleum_directive;
DROP TABLE IF EXISTS public.petroleum_attachments;
DROP TABLE IF EXISTS public.permissions;
DROP TABLE IF EXISTS public.partners;
DROP TABLE IF EXISTS public.partner_attachments;
DROP TABLE IF EXISTS public.objectives;
DROP TABLE IF EXISTS public.news_tags;
DROP TABLE IF EXISTS public.news_reads;
DROP TABLE IF EXISTS public.news_reactions;
DROP TABLE IF EXISTS public.news_metadata;
DROP TABLE IF EXISTS public.news_feedbacks;
DROP TABLE IF EXISTS public.news_attachments;
DROP TABLE IF EXISTS public.news;
DROP TABLE IF EXISTS public.mining_service_card;
DROP TABLE IF EXISTS public.mining_service;
DROP TABLE IF EXISTS public.mining_regulation_process;
DROP TABLE IF EXISTS public.mining_guideline_content;
DROP TABLE IF EXISTS public.mining_guideline_attachments;
DROP TABLE IF EXISTS public.mining_guideline;
DROP TABLE IF EXISTS public.mining_framework;
DROP TABLE IF EXISTS public.mining_application_types;
DROP TABLE IF EXISTS public.mining_application_process_attachments;
DROP TABLE IF EXISTS public.mining_application_process;
DROP TABLE IF EXISTS public.messages;
DROP TABLE IF EXISTS public.licensing_contacts;
DROP TABLE IF EXISTS public.leadership_attachments;
DROP TABLE IF EXISTS public.leadership;
DROP TABLE IF EXISTS public.investigation_strategy;
DROP TABLE IF EXISTS public.investigation_action;
DROP TABLE IF EXISTS public.investigate_ethiopia;
DROP TABLE IF EXISTS public.gamestones;
DROP TABLE IF EXISTS public.gamestone_attachments;
DROP TABLE IF EXISTS public.footers;
DROP TABLE IF EXISTS public.footer_sections;
DROP TABLE IF EXISTS public.federal_office_contacts;
DROP TABLE IF EXISTS public.events;
DROP TABLE IF EXISTS public.event_categories;
DROP TABLE IF EXISTS public.event_attachments;
DROP TABLE IF EXISTS public.core_values;
DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.backgrounds;
DROP TABLE IF EXISTS public.background_attachments;
DROP TABLE IF EXISTS public.audit_logs;
DROP TABLE IF EXISTS public.attachments;
DROP TABLE IF EXISTS public.asm_previews;
DROP TABLE IF EXISTS public.asm_attachments;
DROP TABLE IF EXISTS public.asm;
DROP TABLE IF EXISTS public."SequelizeMeta";
DROP TYPE IF EXISTS public.enum_vacancies_status;
DROP TYPE IF EXISTS public.enum_vacancies_employment_type;
DROP TYPE IF EXISTS public.enum_tenders_status;
DROP TYPE IF EXISTS public.enum_snapshot_sector;
DROP TYPE IF EXISTS public.enum_resource_sector;
DROP TYPE IF EXISTS public.enum_petroleum_objective_type;
DROP TYPE IF EXISTS public.enum_petroleum_directive_type;
DROP TYPE IF EXISTS public.enum_partner_attachments_category;
DROP TYPE IF EXISTS public.enum_objectives_type;
DROP TYPE IF EXISTS public.enum_news_status;
DROP TYPE IF EXISTS public.enum_news_reactions_reaction;
DROP TYPE IF EXISTS public.enum_news_attachments_category;
DROP TYPE IF EXISTS public.enum_mining_guideline_content_type;
DROP TYPE IF EXISTS public.enum_investigation_strategy_type;
DROP TYPE IF EXISTS public.enum_events_status;
--
-- Name: enum_events_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_events_status AS ENUM (
    'draft',
    'scheduled',
    'published',
    'ongoing',
    'completed',
    'archived',
    'cancelled'
);


--
-- Name: enum_investigation_strategy_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_investigation_strategy_type AS ENUM (
    'headlines',
    'strategic_minerals',
    'autonomy',
    'autonomous_institutions',
    'strategic_pillars',
    'ambition',
    'global_proclamation'
);


--
-- Name: enum_mining_guideline_content_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_mining_guideline_content_type AS ENUM (
    'card',
    'bullet',
    'others'
);


--
-- Name: enum_news_attachments_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_news_attachments_category AS ENUM (
    'headline',
    'body',
    'footer'
);


--
-- Name: enum_news_reactions_reaction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_news_reactions_reaction AS ENUM (
    'like',
    'dislike'
);


--
-- Name: enum_news_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_news_status AS ENUM (
    'draft',
    'published',
    'archived'
);


--
-- Name: enum_objectives_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_objectives_type AS ENUM (
    'headlines',
    'strategic_objective',
    'economic_impact',
    'impact_contribution',
    'strategic_pillars',
    'key_initiatives',
    'objectives'
);


--
-- Name: enum_partner_attachments_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_partner_attachments_category AS ENUM (
    'logo',
    'gallery',
    'document'
);


--
-- Name: enum_petroleum_directive_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_petroleum_directive_type AS ENUM (
    'main',
    'sub'
);


--
-- Name: enum_petroleum_objective_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_petroleum_objective_type AS ENUM (
    'headline',
    'others'
);


--
-- Name: enum_resource_sector; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_resource_sector AS ENUM (
    'mining',
    'geology',
    'petroleum',
    'other'
);


--
-- Name: enum_snapshot_sector; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_snapshot_sector AS ENUM (
    'mining',
    'geothermal',
    'petroleum',
    'others'
);


--
-- Name: enum_tenders_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_tenders_status AS ENUM (
    'draft',
    'published',
    'closed'
);


--
-- Name: enum_vacancies_employment_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_vacancies_employment_type AS ENUM (
    'full_time',
    'contract',
    'part_time'
);


--
-- Name: enum_vacancies_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_vacancies_status AS ENUM (
    'draft',
    'published',
    'closed'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


--
-- Name: asm; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asm (
    asm_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: asm_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asm_attachments (
    asm_attachment_id uuid NOT NULL,
    label character varying(255) NOT NULL,
    asm_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: asm_previews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.asm_previews (
    preview_id uuid NOT NULL,
    asm_id uuid,
    icon character varying(255),
    title character varying(255) NOT NULL,
    description text,
    attachment_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.attachments (
    attachment_id uuid NOT NULL,
    file_name character varying(255) NOT NULL,
    file_path character varying(500) NOT NULL,
    uploaded_by uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    file_path_thumb character varying(500),
    file_path_medium character varying(500),
    file_path_large character varying(500),
    mime_type character varying(100),
    width integer,
    height integer
);


--
-- Name: audit_logs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.audit_logs (
    audit_id uuid NOT NULL,
    user_id uuid,
    action character varying(50) NOT NULL,
    model_name character varying(100) NOT NULL,
    record_id character varying(255) NOT NULL,
    old_values jsonb,
    new_values jsonb,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: background_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.background_attachments (
    background_attachment_id uuid NOT NULL,
    background_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: backgrounds; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.backgrounds (
    background_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    icon character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: cards; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.cards (
    card_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    button_name character varying(100),
    button_url character varying(500),
    attachment_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: core_values; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.core_values (
    value_id uuid NOT NULL,
    section_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    icon character varying(255),
    content text
);


--
-- Name: event_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_attachments (
    event_attachment_id uuid NOT NULL,
    event_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: event_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_categories (
    event_category_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    event_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    event_category_id uuid,
    description text,
    start_time timestamp with time zone NOT NULL,
    end_time timestamp with time zone NOT NULL,
    location character varying(255),
    virtual_link text,
    organizer character varying(255) NOT NULL,
    content text,
    status public.enum_events_status DEFAULT 'draft'::public.enum_events_status,
    publish_start timestamp with time zone,
    publish_end timestamp with time zone,
    published_at timestamp with time zone,
    approved_by uuid,
    approved_at timestamp with time zone,
    created_by uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: federal_office_contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.federal_office_contacts (
    federal_office_id uuid NOT NULL,
    office_address text NOT NULL,
    phone character varying(50),
    email character varying(255),
    map_location character varying(500),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: COLUMN federal_office_contacts.map_location; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.federal_office_contacts.map_location IS 'Can store map URL or coordinates';


--
-- Name: footer_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_sections (
    footer_section_id uuid NOT NULL,
    footer_id uuid NOT NULL,
    section_name character varying(100) NOT NULL,
    links json DEFAULT '[]'::json NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: footers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footers (
    footer_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    text character varying(1000) NOT NULL,
    attachment_id uuid,
    content text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: gamestone_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gamestone_attachments (
    gamestone_attachment_id uuid NOT NULL,
    gamestone_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: gamestones; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gamestones (
    gamestone_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    location text,
    attachment_id uuid,
    discovered_date timestamp with time zone,
    parent_id uuid,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: investigate_ethiopia; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investigate_ethiopia (
    investigate_ethiopia_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: investigation_action; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investigation_action (
    investigation_action_id uuid NOT NULL,
    investigate_ethiopia_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text NOT NULL,
    action text NOT NULL,
    link character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: investigation_strategy; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investigation_strategy (
    investigation_strategy_id uuid NOT NULL,
    investigate_ethiopia_id uuid NOT NULL,
    type public.enum_investigation_strategy_type DEFAULT 'headlines'::public.enum_investigation_strategy_type NOT NULL,
    icon character varying(255),
    title text NOT NULL,
    description text,
    content text,
    tags character varying(255)[],
    attachment_id uuid,
    link character varying(255),
    bg_color character varying(255) DEFAULT '#0b102dff'::character varying,
    fg_color character varying(255) DEFAULT '#FFFFFF'::character varying,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: leadership; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leadership (
    leadership_id uuid NOT NULL,
    header character varying(255) DEFAULT 'Minister of Mines'::character varying NOT NULL,
    parent_id uuid,
    name character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    level integer DEFAULT 1,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: leadership_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.leadership_attachments (
    leadership_attachment_id uuid NOT NULL,
    leadership_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: licensing_contacts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.licensing_contacts (
    licensing_contact_id uuid NOT NULL,
    regional_office_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255),
    phone character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    message_id uuid NOT NULL,
    full_name character varying(255) NOT NULL,
    email_address character varying(255) NOT NULL,
    subject character varying(255) NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_application_process; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_application_process (
    mining_application_process_id uuid CONSTRAINT mining_application_process_mining_application_process__not_null NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    objectives json DEFAULT '[]'::json NOT NULL,
    publish boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_application_process_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_application_process_attachments (
    mining_application_process_attachment_id uuid CONSTRAINT mining_application_process__mining_application_process_not_null NOT NULL,
    mining_application_process_id uuid CONSTRAINT mining_application_process_mining_application_process_not_null1 NOT NULL,
    attachment_id uuid NOT NULL,
    overlay_text character varying(255) NOT NULL,
    overlay_icon character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: mining_application_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_application_types (
    mining_application_types_id uuid NOT NULL,
    mining_application_process_id uuid NOT NULL,
    icon text NOT NULL,
    title text NOT NULL,
    requirements json DEFAULT '[]'::json NOT NULL,
    steps json DEFAULT '[]'::json NOT NULL,
    action_label text NOT NULL,
    action_url text NOT NULL,
    color text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_framework; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_framework (
    mining_framework_id uuid NOT NULL,
    mining_regulation_process_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    objectives json DEFAULT '[]'::json NOT NULL,
    attachment_id uuid,
    attachment_overlay_text text DEFAULT 'Mining Framework'::text,
    attachment_overlay_color text DEFAULT '#ffffff'::text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_guideline; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_guideline (
    mining_guideline_id uuid NOT NULL,
    mining_regulation_process_id uuid NOT NULL,
    icon text,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_guideline_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_guideline_attachments (
    mining_guideline_attachment_id uuid CONSTRAINT mining_guideline_attachment_mining_guideline_attachmen_not_null NOT NULL,
    mining_guideline_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    label character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: mining_guideline_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_guideline_content (
    mining_guideline_content_id uuid NOT NULL,
    mining_guideline_id uuid NOT NULL,
    type public.enum_mining_guideline_content_type DEFAULT 'others'::public.enum_mining_guideline_content_type NOT NULL,
    bg_color text,
    icon text,
    stamp text,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_regulation_process; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_regulation_process (
    mining_regulation_process_id uuid NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    publish boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_service; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_service (
    mining_service_id uuid NOT NULL,
    mining_regulation_process_id uuid NOT NULL,
    title text NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: mining_service_card; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mining_service_card (
    mining_service_card_id uuid NOT NULL,
    mining_service_id uuid NOT NULL,
    title text NOT NULL,
    sub_title text,
    sub_title_color text DEFAULT '#f8f521ff'::text,
    icon text,
    description text NOT NULL,
    requirements json DEFAULT '[]'::json NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: news; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news (
    news_id uuid NOT NULL,
    title text NOT NULL,
    content json NOT NULL,
    author text,
    status public.enum_news_status DEFAULT 'draft'::public.enum_news_status NOT NULL,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: news_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_attachments (
    news_attachment_id uuid NOT NULL,
    news_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    category public.enum_news_attachments_category DEFAULT 'body'::public.enum_news_attachments_category NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: news_feedbacks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_feedbacks (
    news_feedback_id uuid NOT NULL,
    news_id uuid NOT NULL,
    fullname character varying(150) NOT NULL,
    thought text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    is_published boolean DEFAULT false NOT NULL
);


--
-- Name: news_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_metadata (
    news_metadata_id uuid NOT NULL,
    news_id uuid NOT NULL,
    like_count integer DEFAULT 0,
    dislike_count integer DEFAULT 0,
    read_count integer DEFAULT 0,
    average_read_time integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: news_reactions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_reactions (
    news_reaction_id uuid NOT NULL,
    news_id uuid NOT NULL,
    ip_address character varying(45) NOT NULL,
    reaction public.enum_news_reactions_reaction NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: news_reads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_reads (
    news_read_id uuid NOT NULL,
    news_id uuid NOT NULL,
    ip_address character varying(45) NOT NULL,
    total_read_time integer DEFAULT 0,
    last_read_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: news_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.news_tags (
    news_tag_id uuid NOT NULL,
    news_id uuid NOT NULL,
    tag_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: objectives; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.objectives (
    objective_id uuid NOT NULL,
    asm_id uuid,
    type public.enum_objectives_type DEFAULT 'objectives'::public.enum_objectives_type NOT NULL,
    icon character varying(255),
    title text NOT NULL,
    description text,
    content text,
    foot_note text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: partner_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partner_attachments (
    partner_attachment_id uuid NOT NULL,
    category public.enum_partner_attachments_category DEFAULT 'logo'::public.enum_partner_attachments_category NOT NULL,
    partner_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: partners; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.partners (
    partner_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.permissions (
    permission_id uuid NOT NULL,
    resource character varying(100) NOT NULL,
    action character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: petroleum_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_attachments (
    petroleum_attachment_id uuid NOT NULL,
    label character varying(255) NOT NULL,
    petroleum_objective_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: petroleum_directive; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_directive (
    petroleum_directive_id uuid NOT NULL,
    petroleum_regulation_process_id uuid NOT NULL,
    "order" integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    type public.enum_petroleum_directive_type DEFAULT 'sub'::public.enum_petroleum_directive_type NOT NULL,
    action_label text,
    action text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: petroleum_objective; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_objective (
    petroleum_objective_id uuid NOT NULL,
    type public.enum_petroleum_objective_type DEFAULT 'others'::public.enum_petroleum_objective_type NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content text,
    objectives json DEFAULT '[]'::json NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: petroleum_processes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_processes (
    petroleum_process_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: petroleum_regulation; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_regulation (
    petroleum_regulation_id uuid NOT NULL,
    petroleum_regulation_process_id uuid NOT NULL,
    "order" integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    content json DEFAULT '[]'::json NOT NULL,
    objectives json DEFAULT '[]'::json NOT NULL,
    bullet_points json DEFAULT '[]'::json NOT NULL,
    steps json DEFAULT '[]'::json NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: petroleum_regulation_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_regulation_attachments (
    petroleum_regulation_attachment_id uuid CONSTRAINT petroleum_regulation_attach_petroleum_regulation_attac_not_null NOT NULL,
    petroleum_regulation_process_id uuid CONSTRAINT petroleum_regulation_attach_petroleum_regulation_proce_not_null NOT NULL,
    attachment_id uuid NOT NULL,
    label character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: petroleum_regulation_process; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.petroleum_regulation_process (
    petroleum_regulation_process_id uuid CONSTRAINT petroleum_regulation_proces_petroleum_regulation_proce_not_null NOT NULL,
    published boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: process_block_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.process_block_attachments (
    process_block_attachment_id uuid NOT NULL,
    label character varying(255) NOT NULL,
    process_block_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: process_blocks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.process_blocks (
    process_block_id uuid NOT NULL,
    petroleum_process_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    content json,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: process_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.process_steps (
    process_step_id uuid NOT NULL,
    petroleum_process_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    content json,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: regional_office_contact_centers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.regional_office_contact_centers (
    regional_office_id uuid NOT NULL,
    region_id uuid NOT NULL,
    bureau_name character varying(255) NOT NULL,
    address text,
    director character varying(255),
    email character varying(255),
    phone character varying(50),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: regions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.regions (
    region_id uuid NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resource (
    resource_id uuid NOT NULL,
    sector public.enum_resource_sector NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: resource_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.resource_attachments (
    resource_attachment_id uuid NOT NULL,
    resource_id uuid NOT NULL,
    attachment_id uuid NOT NULL,
    label character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL
);


--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.role_permissions (
    role_permission_id uuid NOT NULL,
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    role_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: route_translations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.route_translations (
    route_translation_id uuid NOT NULL,
    route_id uuid NOT NULL,
    language_code character varying(10) NOT NULL,
    label character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: routes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.routes (
    route_id uuid NOT NULL,
    path character varying(255),
    parent_id uuid,
    "order" integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    show_in_navbar boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: COLUMN routes.path; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.routes.path IS 'URL path - null for parent groups';


--
-- Name: services; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.services (
    service_id uuid NOT NULL,
    icon character varying(255) NOT NULL,
    title character varying(100) NOT NULL,
    content character varying(555) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: sliders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sliders (
    slider_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    attachment_id uuid,
    "order" integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone,
    button_name character varying(255),
    button_url character varying(500),
    button2_name character varying(255),
    button2_url character varying(500)
);


--
-- Name: snapshot; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.snapshot (
    snapshot_id uuid NOT NULL,
    title text NOT NULL,
    sector public.enum_snapshot_sector NOT NULL,
    description_one text NOT NULL,
    description_two text NOT NULL,
    attachment_id uuid NOT NULL,
    attachment_description text,
    is_published boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: snapshot_section; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.snapshot_section (
    section_id uuid NOT NULL,
    snapshot_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: social_medias; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.social_medias (
    social_media_id uuid NOT NULL,
    platform_name character varying(100) NOT NULL,
    icon character varying(255) NOT NULL,
    url character varying(500) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.steps (
    step_id uuid NOT NULL,
    process_step_id uuid NOT NULL,
    description text,
    attachment_id uuid NOT NULL,
    "order" integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp with time zone
);


--
-- Name: strategies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.strategies (
    strategy_id uuid NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: strategy_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.strategy_sections (
    section_id uuid NOT NULL,
    strategy_id uuid NOT NULL,
    type character varying(50) NOT NULL,
    title character varying(255) NOT NULL,
    attachment_id uuid NOT NULL,
    content text
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    tag_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: tenders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tenders (
    tender_id uuid NOT NULL,
    title character varying(500) NOT NULL,
    reference_number character varying(100),
    description text NOT NULL,
    published_date date NOT NULL,
    closing_date date NOT NULL,
    attachment_id uuid,
    status public.enum_tenders_status DEFAULT 'draft'::public.enum_tenders_status NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    user_role_id uuid NOT NULL,
    user_id uuid NOT NULL,
    role_id uuid NOT NULL,
    assigned_by uuid,
    assigned_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: user_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_types (
    user_type_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    user_id uuid NOT NULL,
    user_type_id uuid,
    full_name character varying(100) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone_number character varying(50),
    profile_image character varying(255),
    is_first_logged_in boolean DEFAULT true NOT NULL,
    last_login_at timestamp with time zone,
    password_changed_at timestamp with time zone,
    reset_password_otp character varying(255),
    reset_password_otp_expires timestamp with time zone,
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: vacancies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vacancies (
    vacancy_id uuid NOT NULL,
    job_title character varying(500) NOT NULL,
    department character varying(255),
    location character varying(255),
    employment_type public.enum_vacancies_employment_type DEFAULT 'full_time'::public.enum_vacancies_employment_type NOT NULL,
    positions integer,
    description text NOT NULL,
    requirements text,
    published_date date NOT NULL,
    application_deadline date NOT NULL,
    attachment_id uuid,
    status public.enum_vacancies_status DEFAULT 'draft'::public.enum_vacancies_status NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SequelizeMeta" (name) FROM stdin;
20251210084133-create-user-types.js
20251210084301-create-permissions.js
20251210084404-create-roles.js
20251210084443-create-role-permissions.js
20251210084552-create-users.js
20251210084639-create-user-roles.js
20260218195338-create-attachments-table.js
20260218195752-create-tags-table.js
20260218195825-create-news-table.js
20260218195955-create-news-metadata-table.js
20260218200017-create-news-attachments-table.js
20260218200047-create-news-tags-table.js
20260218200108-create-news-reactions-table.js
20260218200132-create-news-reads-table.js
20260220135313-create-news-feedbacks.js
20260223115309-create-services.js
20260223132409-create-backgrounds.js
20260223132428-create-background-attachments.js
20260224085409-create-leadership-table.js
20260224085429-create-leadership-attachments-table.js
20260306084533-create-strategies.js
20260306084535-create-strategy-sections.js
20260306084537-create-core-values.js
20260309092503-create-regions-table.js
20260309092506-create-federal-office-contacts-table.js
20260309092509-create-regional-office-contact-centers-table.js
20260309092511-create-licensing-contacts-table.js
20260311074315-create-messages-table.js
20260311083559-create-social-medias-table.js
20260311121733-create-footer.js
20260311121800-create-footer-section.js
20260325172233-create-cards-table.js
20260325172632-create-sliders-table.js
20260325182142-create-partners-table.js
20260325182206-create-partner-attachments-table.js
20260326094257-create-gamestones.js
20260326094259-create-gamestone-attachments.js
20260327054852-create-resource-table.js
20260327054937-create-resource-attachments-table.js
20260404162044-create-snapshot.js
20260404162045-create-snapshot-section.js
20260406065222-create-asm-table.js
20260406065230-create-objectives-table.js
20260406065237-create-asm-attachments-table.js
20260406081153-create-asm-previews.js
20260406132426-create-investigate-ethiopia.js
20260406132428-create-investigation-action.js
20260406132429-create-investigation-strategy.js
20260408072905-create-petroleum-objective.js
20260408072907-create-petroleum-attachments.js
20260410111555-create-petroleum-processes.js
20260410111556-create-process-blocks.js
20260410111557-create-process-block-attachments.js
20260410111559-create-process-steps.js
20260410111600-create-steps.js
20260413142635-create-petroleum-regulation-process-table.js
20260413142656-create-petroleum-regulation-table.js
20260413142718-create-petroleum-regulation-attachments-table.js
20260413142736-create-petroleum-directive-table.js
20260414131811-create-mining-application-process-table.js
20260414131813-create-mining-application-process-attachments-table.js
20260414131814-create-mining-application-types-table.js
20260416142816-create-mining-regulation-process.js
20260416142818-create-mining-framework.js
20260416142819-create-mining-guideline.js
20260416142822-create-mining-guideline-content.js
20260416142824-create-mining-guideline-attachments.js
20260416142826-create-mining-service.js
20260416142828-create-mining-service-card.js
20260417105500-fix-mining-attachment-constraints.js
20260417105600-fix-other-attachment-constraints.js
20260417125500-add-is-published-to-news-feedback.js
20260417183004-remove-unique-from-permissions-resource.js
20260418231000-create-audit-logs.js
20260421000001-create-event-categories.js
20260421000002-create-events.js
20260421000003-create-event-attachments.js
20260423184442-create-routes-table.js
20260423184444-create-route-translations-table.js
20260622140000-create-tenders-table.js
20260622140100-create-vacancies-table.js
20260625000000-sync-production-schema-from-v1.js
\.


--
-- Data for Name: asm; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.asm (asm_id, created_at, updated_at, deleted_at) FROM stdin;
9a531821-f822-4f20-a51f-2cf42f92a50b	2026-05-04 01:15:58.589-07	2026-05-04 02:02:41.253-07	\N
\.


--
-- Data for Name: asm_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.asm_attachments (asm_attachment_id, label, asm_id, attachment_id, created_at) FROM stdin;
bd7019a2-070f-4914-924a-2b4cfd628b80	Environmental Management Guidelines for Artisinal Miners in Ethiopia	9a531821-f822-4f20-a51f-2cf42f92a50b	c127c2e6-1f9c-4ca1-b051-f69aee415773	2026-05-04 02:02:41.258-07
4c1a4bd0-243b-473c-9424-c07073ba18ae	SUMM Interventions on Gender_ASSM_EITI	9a531821-f822-4f20-a51f-2cf42f92a50b	ee02e7f6-aa70-4441-8cf6-c643fa3e3a85	2026-05-04 02:02:41.258-07
0dbb6a80-63eb-4b77-91e8-cf4fd68f1efe	ASM Study Report	9a531821-f822-4f20-a51f-2cf42f92a50b	a99b6519-eb79-4e77-a9a2-3e46c270b7d6	2026-05-04 02:02:41.258-07
\.


--
-- Data for Name: asm_previews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.asm_previews (preview_id, asm_id, icon, title, description, attachment_id, created_at, updated_at) FROM stdin;
52021f9b-03e3-4ee5-b4f8-8b5f1dc1b0a4	9a531821-f822-4f20-a51f-2cf42f92a50b		ASM Regions	Artisanal mining is concentrated in Ethiopia’s rich Greenstone Belts, producing Gold, Opals, Emeralds, and Tantalum.	b36de25f-97ce-4dbe-b519-2eaa95841380	2026-05-04 02:02:41.274-07	2026-05-04 02:02:41.274-07
0f0c1651-c68c-4867-9438-011b36b5fc85	9a531821-f822-4f20-a51f-2cf42f92a50b		Indigenous Knowledge 	Placer gold deposits have been exploited for thousands of years using rudimentary but effective techniques passed down through generations.	\N	2026-05-04 02:02:41.274-07	2026-05-04 02:02:41.274-07
\.


--
-- Data for Name: attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.attachments (attachment_id, file_name, file_path, uploaded_by, created_at, file_path_thumb, file_path_medium, file_path_large, mime_type, width, height) FROM stdin;
bda60769-3a7f-4a09-b119-9da23c75db60	1777438774373-614220392_sustainable-mining-green-growth-coal-mining-site-with-emerging-new-life-representing-environmental-responsibility-industrial-transformation_923559-19928.jpg	uploads/attachments/1777438774373-614220392_sustainable-mining-green-growth-coal-mining-site-with-emerging-new-life-representing-environmental-responsibility-industrial-transformation_923559-19928.jpg	\N	2026-04-28 21:59:34.376-07	\N	\N	\N	\N	\N	\N
a99b6519-eb79-4e77-a9a2-3e46c270b7d6	1777882798144-737435283_blank.pdf	uploads/attachments/1777882798144-737435283_blank.pdf	\N	2026-05-04 01:19:58.146-07	\N	\N	\N	\N	\N	\N
ee02e7f6-aa70-4441-8cf6-c643fa3e3a85	1777882841582-665989439_blank.pdf	uploads/attachments/1777882841582-665989439_blank.pdf	\N	2026-05-04 01:20:41.584-07	\N	\N	\N	\N	\N	\N
c127c2e6-1f9c-4ca1-b051-f69aee415773	1777882903433-9217381_blank.pdf	uploads/attachments/1777882903433-9217381_blank.pdf	\N	2026-05-04 01:21:43.433-07	\N	\N	\N	\N	\N	\N
64fd31fe-b3a6-4a9b-9d5a-04bd9842003d	1777439965285-590268150_financial-growth-investment-success-with-stacks-gold-coins.jpg	uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/large.webp	\N	2026-04-28 22:19:25.326-07	uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/thumb.webp	uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/medium.webp	uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/large.webp	image/webp	8736	4896
058f02be-e6f8-4f5d-8221-0a15afa2ca0e	1777441104431-353194401_delicious-candy-looking-like-gems-arrangement.jpg	uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/large.webp	\N	2026-04-28 22:38:24.513-07	uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/thumb.webp	uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/medium.webp	uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/large.webp	image/webp	6720	4480
519dbdc4-1e62-4820-b5ad-06acb7cf979d	1777441899337-261053355_dump-truck-pit-mine_1.jpg	uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/large.webp	\N	2026-04-28 22:51:39.399-07	uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/thumb.webp	uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/medium.webp	uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/large.webp	image/webp	4752	3168
2071c280-24f5-4c27-92d8-6571077d58eb	1777442369804-155274116_african-development-fund-logo-png_seeklogo-508981.png	uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/large.webp	\N	2026-04-28 22:59:29.805-07	uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/thumb.webp	uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/medium.webp	uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/large.webp	image/webp	600	600
e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d	1777442709741-638605964_map.jpg	uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/large.webp	\N	2026-04-28 23:05:09.786-07	uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/thumb.webp	uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/medium.webp	uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/large.webp	image/webp	7500	5000
f11861df-6e14-4dae-8c30-a2031626751a	1777443032701-299833419_diamond.png	uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/large.webp	\N	2026-04-28 23:10:32.702-07	uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/thumb.webp	uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/medium.webp	uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/large.webp	image/webp	512	512
2683be44-e55d-4fe1-bcc4-ecf12c25fb96	1777449349261-464739902_habtamu-tegegn-profile.jpg	uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/large.webp	\N	2026-04-29 00:55:49.275-07	uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/thumb.webp	uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/medium.webp	uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/large.webp	image/webp	3268	3268
b9a14b06-705e-4988-88ab-d32f5787dc56	1777463539897-492898137_54290.jpg	uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/large.webp	\N	2026-04-29 04:52:19.92-07	uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/thumb.webp	uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/medium.webp	uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/large.webp	image/webp	5301	5315
7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	1777464319213-655797989_54290.jpg	uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/large.webp	\N	2026-04-29 05:05:19.23-07	uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/thumb.webp	uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/medium.webp	uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/large.webp	image/webp	5301	5315
0db1123d-12cc-4bfe-82d0-5760a7f7e8db	1777464503690-388155409_images.png	uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/large.webp	\N	2026-04-29 05:08:23.691-07	uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/thumb.webp	uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/medium.webp	uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/large.webp	image/webp	372	135
eaa30a4e-8d65-4315-9db3-7e0c2646681f	1777880869064-836538035_4.png	uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/large.webp	\N	2026-05-04 00:47:49.08-07	uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/thumb.webp	uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/medium.webp	uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/large.webp	image/webp	1620	1620
cc26cba9-36e4-4d77-bc9d-daf628d5b05d	1777881124428-266870959_4.png	uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/large.webp	\N	2026-05-04 00:52:04.445-07	uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/thumb.webp	uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/medium.webp	uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/large.webp	image/webp	1620	1620
b11e85c1-3f80-467a-b2dc-706420e46820	1777883503274-50550617_7.png	uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/large.webp	\N	2026-05-04 01:31:43.277-07	uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/thumb.webp	uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/medium.webp	uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/large.webp	image/webp	994	994
b36de25f-97ce-4dbe-b519-2eaa95841380	1777885185377-528180847_asm.png	uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/large.webp	\N	2026-05-04 01:59:45.38-07	uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/thumb.webp	uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/medium.webp	uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/large.webp	image/webp	752	474
5cb418a7-eb11-42a3-9bc7-b2512a5c4518	1777886101941-651639821_comesa.png	uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/large.webp	\N	2026-05-04 02:15:01.944-07	uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/thumb.webp	uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/medium.webp	uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/large.webp	image/webp	940	940
aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9	1778049679275-131017428_photo_2026-05-06_09-40-12.jpg	uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/large.webp	\N	2026-05-05 23:41:19.278-07	uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/thumb.webp	uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/medium.webp	uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/large.webp	image/webp	1280	987
da265c30-bbba-4295-9210-4178647a231b	1778049679350-286971131_photo_2026-05-06_09-40-21.jpg	uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/large.webp	\N	2026-05-05 23:41:19.353-07	uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/thumb.webp	uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/medium.webp	uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/large.webp	image/webp	1280	614
91b5afae-abc5-4f9b-ac0a-1cef4845a528	1777437882434-444237339_StockCake-Sunrise_Mine_Machinery-433183-standard.jpg	uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/large.webp	\N	2026-04-28 21:44:42.44-07	uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/thumb.webp	uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/medium.webp	uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/large.webp	image/webp	1456	816
b3c58304-f4fd-4261-93f1-90e55abaa23e	1777438589505-791318996_charlvera-ai-generated-8708404_1920.jpg	uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/large.webp	\N	2026-04-28 21:56:29.509-07	uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/thumb.webp	uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/medium.webp	uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/large.webp	image/webp	1920	1097
fe50ac36-5dcb-422f-bb4a-ac503118faed	1777439978593-292949641_financial-growth-investment-success-with-stacks-gold-coins.jpg	uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/large.webp	\N	2026-04-28 22:19:38.614-07	uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/thumb.webp	uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/medium.webp	uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/large.webp	image/webp	8736	4896
29a3598c-d576-42c3-aa22-8e8415fb623b	1777441426422-649197194_communicationcy-open-pit-mining-920200.jpg	uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/large.webp	\N	2026-04-28 22:43:46.447-07	uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/thumb.webp	uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/medium.webp	uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/large.webp	image/webp	4238	2772
bf4fa4d0-de4a-42a9-8b05-d5e86ba68569	1778050463930-657401390_photo_2026-05-06_09-53-28.jpg	uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/large.webp	\N	2026-05-05 23:54:23.932-07	uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/thumb.webp	uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/medium.webp	uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/large.webp	image/webp	1280	853
9fd1eb29-7cb4-4c9a-b394-1911f92f07b1	1778050464009-912461945_photo_2026-05-06_09-54-00.jpg	uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/large.webp	\N	2026-05-05 23:54:24.011-07	uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/thumb.webp	uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/medium.webp	uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/large.webp	image/webp	1280	647
d8b81d23-4ca8-4240-8261-b43b907160b2	1778050464019-39263597_photo_2026-05-06_09-53-57.jpg	uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/large.webp	\N	2026-05-05 23:54:24.022-07	uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/thumb.webp	uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/medium.webp	uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/large.webp	image/webp	1280	837
3f0839c6-8870-4825-b16d-0abb7374f1df	1778051053720-231975946_photo_2026-05-06_10-03-48.jpg	uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/large.webp	\N	2026-05-06 00:04:13.723-07	uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/thumb.webp	uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/medium.webp	uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/large.webp	image/webp	1280	887
4bd767e5-b064-473d-8516-d29675c528d2	1778051070997-192801565_photo_2026-05-06_10-03-44.jpg	uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/large.webp	\N	2026-05-06 00:04:31-07	uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/thumb.webp	uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/medium.webp	uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/large.webp	image/webp	1280	664
48ce37d2-bc37-44d6-91c1-462720a75e99	1778051071042-567117279_photo_2026-05-06_10-03-54.jpg	uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/large.webp	\N	2026-05-06 00:04:31.044-07	uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/thumb.webp	uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/medium.webp	uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/large.webp	image/webp	1280	862
7b4c84a9-88a8-4067-b83e-c8e967189bf4	1778051368923-459913217_photo_2026-05-06_10-08-43.jpg	uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/large.webp	\N	2026-05-06 00:09:28.924-07	uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/thumb.webp	uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/medium.webp	uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/large.webp	image/webp	1280	811
e37ae1be-549b-40b3-bed0-6bb05cce942f	1778051368951-165305823_photo_2026-05-06_10-08-56.jpg	uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/large.webp	\N	2026-05-06 00:09:28.957-07	uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/thumb.webp	uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/medium.webp	uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/large.webp	image/webp	1280	917
aea0f70b-fd0c-451f-8f00-5ea378c653fe	1778224902822-565540848_Fire_opal.jpg	uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/large.webp	\N	2026-05-08 00:21:42.824-07	uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/thumb.webp	uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/medium.webp	uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/large.webp	image/webp	800	726
febdd5e9-b64d-461a-a2ce-bf78cdf993a2	1778225481304-625481919_mezezo_opal.jpg	uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/large.webp	\N	2026-05-08 00:31:21.307-07	uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/thumb.webp	uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/medium.webp	uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/large.webp	image/webp	570	421
e6a50da5-efae-4ee5-9d29-c150c960fe36	1778226810045-551491276_ethio-emerald.jpg	uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/large.webp	\N	2026-05-08 00:53:30.048-07	uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/thumb.webp	uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/medium.webp	uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/large.webp	image/webp	636	358
115491eb-abf0-4ba1-a1e2-5a7ee8debaf2	1778227262056-40934564_kenticha-emerald.jpg	uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/large.webp	\N	2026-05-08 01:01:02.058-07	uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/thumb.webp	uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/medium.webp	uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/large.webp	image/webp	932	699
acc6bcca-d249-4e78-ad9b-8942da143eb2	1778228221421-483656894_ethio-emerald.jpg	uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/large.webp	\N	2026-05-08 01:17:01.422-07	uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/thumb.webp	uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/medium.webp	uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/large.webp	image/webp	636	358
881632e9-09ac-4ace-aa2a-1aeeafcdd8aa	1780898358751-914976241_cornea.png	uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/large.webp	\N	2026-06-07 22:59:18.758-07	uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/thumb.webp	uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/medium.webp	uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/large.webp	image/webp	1280	1280
172b9bb7-3ff2-4f76-892d-fa587a989c0a	1780899630827-853890181_photo_2026-05-06_09-39-45.jpg	uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/large.webp	\N	2026-06-07 23:20:30.831-07	uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/thumb.webp	uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/medium.webp	uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/large.webp	image/webp	1280	960
6f6d7aa5-1f62-48e2-9944-25d3688342e0	1777442279809-2245219_world-bank-logo.png	uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/large.webp	\N	2026-04-28 22:57:59.811-07	uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/thumb.webp	uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/medium.webp	uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/large.webp	image/webp	1080	1080
24c71477-1316-4e6d-b991-8afdfc122b86	1777442494906-38160186_images.png	uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/large.webp	\N	2026-04-28 23:01:34.907-07	uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/thumb.webp	uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/medium.webp	uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/large.webp	image/webp	372	135
bed2b9fc-17d5-4ddf-89b0-c6522c2da72c	1777443023002-366671770_goal.png	uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/large.webp	\N	2026-04-28 23:10:23.003-07	uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/thumb.webp	uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/medium.webp	uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/large.webp	image/webp	512	512
737ce471-6078-4c06-9cb5-4e2912dd6ba7	1777443027454-83419380_witness.png	uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/large.webp	\N	2026-04-28 23:10:27.455-07	uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/thumb.webp	uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/medium.webp	uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/large.webp	image/webp	512	512
b9e92df0-a3d1-4f86-b6fa-c439e6160b38	1777443351192-184025141_futuristic-smart-city-with-5g-global-network-technology.jpg	uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/large.webp	\N	2026-04-28 23:15:51.262-07	uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/thumb.webp	uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/medium.webp	uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/large.webp	image/webp	4391	2927
c09db559-9b29-49d3-9ffa-b75700d7a95d	1777461893080-617149355_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg	uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/large.webp	\N	2026-04-29 04:24:53.082-07	uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/thumb.webp	uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/medium.webp	uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/large.webp	image/webp	1280	960
23826669-254d-4cbf-b243-35dd65f61530	1777462258323-561097579_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg	uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/large.webp	\N	2026-04-29 04:30:58.326-07	uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/thumb.webp	uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/medium.webp	uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/large.webp	image/webp	1280	960
3afacb79-8d28-4c0d-b6ad-42ac284dad05	1777464503395-88029341_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg	uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/large.webp	\N	2026-04-29 05:08:23.396-07	uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/thumb.webp	uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/medium.webp	uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/large.webp	image/webp	1280	960
9667d5ce-718e-42fd-9cad-db271263a6eb	1777464504585-579720602_futuristic-smart-city-with-5g-global-network-technology.jpg	uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/large.webp	\N	2026-04-29 05:08:24.632-07	uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/thumb.webp	uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/medium.webp	uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/large.webp	image/webp	4391	2927
bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5	1777880993442-375407335_4.png	uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/large.webp	\N	2026-05-04 00:49:53.458-07	uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/thumb.webp	uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/medium.webp	uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/large.webp	image/webp	1620	1620
30b8514a-5df6-459b-8a88-f122d28f3820	1777881032210-652444803_3.png	uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/large.webp	\N	2026-05-04 00:50:32.228-07	uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/thumb.webp	uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/medium.webp	uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/large.webp	image/webp	1620	1620
73053c12-06cc-42f8-8d38-bda4036df6b4	1777881903729-899115261_4.png	uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/large.webp	\N	2026-05-04 01:05:03.745-07	uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/thumb.webp	uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/medium.webp	uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/large.webp	image/webp	1620	1620
c7d890ba-0b67-4b77-be32-533d7b98409d	1777881909469-765756976_3.png	uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/large.webp	\N	2026-05-04 01:05:09.481-07	uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/thumb.webp	uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/medium.webp	uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/large.webp	image/webp	1620	1620
a293e86e-5588-408f-9d86-19ff9b5b59f1	1777883490273-873417009_Untitled_design__2_-removebg-preview.png	uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/large.webp	\N	2026-05-04 01:31:30.277-07	uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/thumb.webp	uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/medium.webp	uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/large.webp	image/webp	500	500
5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3	1777884514599-530251790_logo-only.png	uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/large.webp	\N	2026-05-04 01:48:34.604-07	uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/thumb.webp	uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/medium.webp	uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/large.webp	image/webp	994	994
3a4411a9-987b-4d7a-a0a8-0edbc9a2413f	1777886019894-857160170_unsdg.png	uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/large.webp	\N	2026-05-04 02:13:39.902-07	uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/thumb.webp	uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/medium.webp	uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/large.webp	image/webp	940	753
0322a67e-278b-4f25-a8e2-5011df89ee7c	1777886077458-39254568_agenda.png	uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/large.webp	\N	2026-05-04 02:14:37.464-07	uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/thumb.webp	uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/medium.webp	uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/large.webp	image/webp	940	593
2f361f67-0df0-48cb-9abd-ccb0d1d2c112	1778049679245-65150776_photo_2026-05-06_09-39-45.jpg	uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/large.webp	\N	2026-05-05 23:41:19.248-07	uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/thumb.webp	uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/medium.webp	uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/large.webp	image/webp	1280	960
b1f0f275-2d70-40be-8058-bf042e0dce71	1778049679308-443159849_photo_2026-05-06_09-40-17.jpg	uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/large.webp	\N	2026-05-05 23:41:19.311-07	uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/thumb.webp	uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/medium.webp	uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/large.webp	image/webp	1280	950
0c5d4592-4f0d-4d39-89d4-df1191b7a686	1778049679348-418782620_photo_2026-05-06_09-40-27.jpg	uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/large.webp	\N	2026-05-05 23:41:19.352-07	uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/thumb.webp	uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/medium.webp	uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/large.webp	image/webp	1280	1013
ec5d35bf-3484-4c20-961b-b4d391f7586c	1778050010589-574080062_photo_2026-05-06_09-46-20.jpg	uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/large.webp	\N	2026-05-05 23:46:50.591-07	uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/thumb.webp	uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/medium.webp	uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/large.webp	image/webp	1280	853
2f32c542-dbd8-44a8-b273-487c4b0dfd94	1778050091681-374796025_photo_2026-05-06_09-46-20.jpg	uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/large.webp	\N	2026-05-05 23:48:11.684-07	uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/thumb.webp	uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/medium.webp	uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/large.webp	image/webp	1280	853
e05d8984-7cec-4f45-9210-8b8bf89e57f6	1778050463999-826829435_photo_2026-05-06_09-53-48.jpg	uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/large.webp	\N	2026-05-05 23:54:24.002-07	uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/thumb.webp	uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/medium.webp	uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/large.webp	image/webp	1280	853
95791248-c580-4f26-95fe-3a7abba27676	1778050464010-57329322_photo_2026-05-06_09-53-43.jpg	uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/large.webp	\N	2026-05-05 23:54:24.013-07	uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/thumb.webp	uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/medium.webp	uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/large.webp	image/webp	1280	853
404ac6db-b2fc-43b8-95ad-7436451675dc	1778050464051-639965731_photo_2026-05-06_09-54-04.jpg	uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/large.webp	\N	2026-05-05 23:54:24.052-07	uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/thumb.webp	uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/medium.webp	uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/large.webp	image/webp	1280	853
e72072dd-1024-4306-a671-7936c22589a7	1778050464080-949460906_photo_2026-05-06_09-54-07.jpg	uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/large.webp	\N	2026-05-05 23:54:24.081-07	uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/thumb.webp	uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/medium.webp	uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/large.webp	image/webp	1280	853
5028c83b-3d00-4256-98cb-ee8ac98b5a01	1778051070982-793945096_photo_2026-05-06_10-03-21.jpg	uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/large.webp	\N	2026-05-06 00:04:30.984-07	uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/thumb.webp	uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/medium.webp	uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/large.webp	image/webp	1280	769
863c82dc-5406-4a4a-83da-305c0537a65b	1778051071040-51896687_photo_2026-05-06_10-03-52.jpg	uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/large.webp	\N	2026-05-06 00:04:31.042-07	uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/thumb.webp	uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/medium.webp	uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/large.webp	image/webp	1280	783
5ea5261e-d990-4838-9a28-58f1aa79b6cf	1778051361336-463629095_photo_2026-05-06_10-08-32.jpg	uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/large.webp	\N	2026-05-06 00:09:21.34-07	uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/thumb.webp	uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/medium.webp	uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/large.webp	image/webp	1280	912
0f05c40d-ecef-45b6-8822-3d2f0dffe345	1778051368909-698526959_photo_2026-05-06_10-08-38.jpg	uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/large.webp	\N	2026-05-06 00:09:28.91-07	uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/thumb.webp	uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/medium.webp	uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/large.webp	image/webp	1280	1169
ddeba2d0-a17e-4251-8d08-55c1f8945841	1778051368947-876091022_photo_2026-05-06_10-08-48.jpg	uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/large.webp	\N	2026-05-06 00:09:28.953-07	uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/thumb.webp	uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/medium.webp	uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/large.webp	image/webp	1280	745
1e68b79c-9fc7-4feb-944f-4a812533c9f6	1778051368956-625091960_photo_2026-05-06_10-08-59.jpg	uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/large.webp	\N	2026-05-06 00:09:28.961-07	uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/thumb.webp	uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/medium.webp	uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/large.webp	image/webp	1280	856
e5cf84cd-195c-4e05-b99a-701f3388a5d7	1778225022375-786134919_wello_opal.jpg	uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/large.webp	\N	2026-05-08 00:23:42.377-07	uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/thumb.webp	uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/medium.webp	uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/large.webp	image/webp	259	194
5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0	1778225236289-133460761_black_opal.jpg	uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/large.webp	\N	2026-05-08 00:27:16.291-07	uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/thumb.webp	uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/medium.webp	uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/large.webp	image/webp	640	500
b5fba326-d867-4c35-b1ac-730015e64178	1778225705431-590593055_white_opal.jpg	uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/large.webp	\N	2026-05-08 00:35:05.433-07	uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/thumb.webp	uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/medium.webp	uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/large.webp	image/webp	800	533
e8db7610-dcb5-4660-8e0d-24992d1db142	1778226072038-255009379_opals.jpg	uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/large.webp	\N	2026-05-08 00:41:12.041-07	uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/thumb.webp	uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/medium.webp	uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/large.webp	image/webp	2135	1786
512eae74-f0ee-46d8-9117-d89dee1d2b29	1778227051693-548210343_shakiso-emerald.jpg	uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/large.webp	\N	2026-05-08 00:57:31.695-07	uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/thumb.webp	uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/medium.webp	uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/large.webp	image/webp	275	183
da39ee50-d9ee-4672-8a46-233854921a94	1778227500380-490653513_dermi-eremald.jpg	uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/large.webp	\N	2026-05-08 01:05:00.381-07	uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/thumb.webp	uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/medium.webp	uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/large.webp	image/webp	484	640
a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8	1778227913363-64992621_Beryl-Emerald.jpg	uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/large.webp	\N	2026-05-08 01:11:53.366-07	uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/thumb.webp	uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/medium.webp	uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/large.webp	image/webp	3140	2840
515894af-3621-4ba3-8f27-a917c1e13060	1778228322436-766691958_Ethiopian-emerald.jpg	uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/large.webp	\N	2026-05-08 01:18:42.438-07	uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/thumb.webp	uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/medium.webp	uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/large.webp	image/webp	636	358
36758606-5185-4283-b7b9-aa30a61466eb	1780898358760-153294951_eye.jpg	uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/large.webp	\N	2026-06-07 22:59:18.761-07	uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/thumb.webp	uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/medium.webp	uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/large.webp	image/webp	800	429
d5475308-796a-4719-8405-319d287e61a8	1780898358772-871628174_lumbar_support.jpg	uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/large.webp	\N	2026-06-07 22:59:18.773-07	uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/thumb.webp	uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/medium.webp	uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/large.webp	image/webp	225	225
\.


--
-- Data for Name: audit_logs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.audit_logs (audit_id, user_id, action, model_name, record_id, old_values, new_values, created_at) FROM stdin;
ba4ef3ea-99ac-4614-adf4-b1c15dcee4c8	00000000-0000-4000-8000-000000000001	UPDATE	User	00000000-0000-4000-8000-000000000001	{"email": "admin@gmail.com", "user_id": "00000000-0000-4000-8000-000000000001", "password": "$2b$10$kHAHcWKpV9f2xJovCLm1tuDVfhi2SVySFbUBDuMlS9cCFDbBDVSSy", "full_name": "Admin Account", "is_active": true, "created_at": "2026-04-28T13:48:35.057Z", "updated_at": "2026-04-28T13:48:35.057Z", "phone_number": "251911000001", "user_type_id": null, "last_login_at": "2026-04-28T13:51:03.978Z", "profile_image": null, "is_first_logged_in": true, "reset_password_otp": null, "password_changed_at": null, "reset_password_otp_expires": null}	{"email": "admin@gmail.com", "user_id": "00000000-0000-4000-8000-000000000001", "password": "$2b$10$Xg.K7za2Pg3QFvSD4KB.DeyRWgWxXIbLNDhN5Xts2RkQInfBICHZO", "full_name": "Admin Account", "is_active": true, "created_at": "2026-04-28T13:48:35.057Z", "updated_at": "2026-04-28T13:51:29.524Z", "phone_number": "251911000001", "user_type_id": null, "last_login_at": "2026-04-28T13:51:03.978Z", "profile_image": null, "is_first_logged_in": false, "reset_password_otp": null, "password_changed_at": "2026-04-28T13:51:29.524Z", "reset_password_otp_expires": null}	2026-04-28 06:51:29.534-07
7cbed6d3-378f-434a-91a0-5a70812689b5	00000000-0000-4000-8000-000000000001	CREATE	Slider	53bbc36d-fd2b-4bef-8c46-6923d1d1914e	\N	{"title": "New Slide Title", "slider_id": "53bbc36d-fd2b-4bef-8c46-6923d1d1914e", "created_at": "2026-04-29T04:36:40.469Z", "deleted_at": null, "updated_at": "2026-04-29T04:36:40.469Z", "description": "New slide description goes here.", "attachment_id": null}	2026-04-28 21:36:40.474-07
4736d83d-a0b2-4404-b619-9772b4fa9801	\N	CREATE	Attachment	91b5afae-abc5-4f9b-ac0a-1cef4845a528	\N	{"file_name": "1777437882434-444237339_StockCake-Sunrise_Mine_Machinery-433183-standard.jpg", "file_path": "uploads/attachments/1777437882434-444237339_StockCake-Sunrise_Mine_Machinery-433183-standard.jpg", "created_at": "2026-04-29T04:44:42.440Z", "uploaded_by": null, "attachment_id": "91b5afae-abc5-4f9b-ac0a-1cef4845a528"}	2026-04-28 21:44:42.47-07
d1962702-8e7a-4808-b3e4-e43aa0336027	00000000-0000-4000-8000-000000000001	UPDATE	Slider	53bbc36d-fd2b-4bef-8c46-6923d1d1914e	{"title": "New Slide Title", "slider_id": "53bbc36d-fd2b-4bef-8c46-6923d1d1914e", "created_at": "2026-04-29T04:36:40.469Z", "deleted_at": null, "updated_at": "2026-04-29T04:36:40.469Z", "description": "New slide description goes here.", "attachment_id": null}	{"title": "Driving Ethiopia’s Mineral Future", "slider_id": "53bbc36d-fd2b-4bef-8c46-6923d1d1914e", "created_at": "2026-04-29T04:36:40.469Z", "deleted_at": null, "updated_at": "2026-04-29T04:45:07.484Z", "description": "Unlocking the nation’s mineral wealth through sustainable exploration, responsible mining, and transparent governance for economic growth.", "attachment_id": "91b5afae-abc5-4f9b-ac0a-1cef4845a528"}	2026-04-28 21:45:07.486-07
ae3f8892-f2a6-4d8e-aae0-1fc624f1d247	00000000-0000-4000-8000-000000000001	CREATE	Slider	fe805f29-9f9b-4fef-8967-71ab45462a2d	\N	{"title": "New Slide Title", "slider_id": "fe805f29-9f9b-4fef-8967-71ab45462a2d", "created_at": "2026-04-29T04:50:54.413Z", "deleted_at": null, "updated_at": "2026-04-29T04:50:54.413Z", "description": "New slide description goes here.", "attachment_id": null}	2026-04-28 21:50:54.415-07
6ed5b36e-af97-4ca5-9a45-95c1d0ea6d62	\N	CREATE	Attachment	b3c58304-f4fd-4261-93f1-90e55abaa23e	\N	{"file_name": "1777438589505-791318996_charlvera-ai-generated-8708404_1920.jpg", "file_path": "uploads/attachments/1777438589505-791318996_charlvera-ai-generated-8708404_1920.jpg", "created_at": "2026-04-29T04:56:29.509Z", "uploaded_by": null, "attachment_id": "b3c58304-f4fd-4261-93f1-90e55abaa23e"}	2026-04-28 21:56:29.526-07
7c56b946-e33d-4d01-b20d-3ea5a74e3ee7	\N	CREATE	Attachment	bda60769-3a7f-4a09-b119-9da23c75db60	\N	{"file_name": "1777438774373-614220392_sustainable-mining-green-growth-coal-mining-site-with-emerging-new-life-representing-environmental-responsibility-industrial-transformation_923559-19928.jpg", "file_path": "uploads/attachments/1777438774373-614220392_sustainable-mining-green-growth-coal-mining-site-with-emerging-new-life-representing-environmental-responsibility-industrial-transformation_923559-19928.jpg", "created_at": "2026-04-29T04:59:34.376Z", "uploaded_by": null, "attachment_id": "bda60769-3a7f-4a09-b119-9da23c75db60"}	2026-04-28 21:59:34.401-07
824cdfc2-40a8-4412-a3bd-debd151b272e	00000000-0000-4000-8000-000000000001	UPDATE	Slider	fe805f29-9f9b-4fef-8967-71ab45462a2d	{"title": "New Slide Title", "slider_id": "fe805f29-9f9b-4fef-8967-71ab45462a2d", "created_at": "2026-04-29T04:50:54.413Z", "deleted_at": null, "updated_at": "2026-04-29T04:50:54.413Z", "description": "New slide description goes here.", "attachment_id": null}	{"title": "Sustainable Mining for National Growth", "slider_id": "fe805f29-9f9b-4fef-8967-71ab45462a2d", "created_at": "2026-04-29T04:50:54.413Z", "deleted_at": null, "updated_at": "2026-04-29T04:59:36.361Z", "description": "Promoting environmentally responsible mining practices that protect communities while contributing to Ethiopia’s development.", "attachment_id": "bda60769-3a7f-4a09-b119-9da23c75db60"}	2026-04-28 21:59:36.363-07
bbf8b873-2ae1-4e2a-bd0f-a01269f72f8b	00000000-0000-4000-8000-000000000001	CREATE	Slider	5e06211b-38c9-4b17-963f-5c2fc942b2e1	\N	{"title": "New Slide Title", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:00:05.767Z", "description": "New slide description goes here.", "attachment_id": null}	2026-04-28 22:00:05.769-07
83c0b50f-a6e1-468c-8849-6f25f146d202	\N	CREATE	Attachment	61d2f317-3adc-4d9f-b77a-65cdd62548bb	\N	{"file_name": "1777439352277-194324394_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/1777439352277-194324394_financial-growth-investment-success-with-stacks-gold-coins.jpg", "created_at": "2026-04-29T05:09:12.316Z", "uploaded_by": null, "attachment_id": "61d2f317-3adc-4d9f-b77a-65cdd62548bb"}	2026-04-28 22:09:12.336-07
e989a391-7676-4e4c-885a-2023e8d4e78f	00000000-0000-4000-8000-000000000001	UPDATE	Slider	5e06211b-38c9-4b17-963f-5c2fc942b2e1	{"title": "New Slide Title", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:00:05.767Z", "description": "New slide description goes here.", "attachment_id": null}	{"title": "Empowering Investment in Natural Resources", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:09:16.026Z", "description": "Creating a transparent and investor-friendly environment to attract global partnerships in Ethiopia’s mining sector.", "attachment_id": "61d2f317-3adc-4d9f-b77a-65cdd62548bb"}	2026-04-28 22:09:16.028-07
ef1fe1f2-f19b-4931-8775-bbc3135366fc	\N	CREATE	Attachment	2d09e28f-7b38-481c-b77f-c8e9b34602ce	\N	{"file_name": "1777439940161-432801066_global-economic-growth-business-success.jpg", "file_path": "uploads/attachments/1777439940161-432801066_global-economic-growth-business-success.jpg", "created_at": "2026-04-29T05:19:00.179Z", "uploaded_by": null, "attachment_id": "2d09e28f-7b38-481c-b77f-c8e9b34602ce"}	2026-04-28 22:19:00.183-07
2370f76c-19e2-48a7-b176-eb86f7b18a4e	\N	DELETE	Attachment	61d2f317-3adc-4d9f-b77a-65cdd62548bb	{"file_name": "1777439352277-194324394_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/1777439352277-194324394_financial-growth-investment-success-with-stacks-gold-coins.jpg", "created_at": "2026-04-29T05:09:12.316Z", "uploaded_by": null, "attachment_id": "61d2f317-3adc-4d9f-b77a-65cdd62548bb"}	\N	2026-04-28 22:19:00.262-07
9a2f8d9a-38d2-49d0-ad03-eaccc3a37b69	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:48:15.770Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:51:00.042Z"}	2026-05-04 01:51:00.043-07
3b9b7115-a2e3-4461-be14-8b062a92088c	00000000-0000-4000-8000-000000000001	UPDATE	Slider	5e06211b-38c9-4b17-963f-5c2fc942b2e1	{"title": "Empowering Investment in Natural Resources", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:09:16.026Z", "description": "Creating a transparent and investor-friendly environment to attract global partnerships in Ethiopia’s mining sector.", "attachment_id": null}	{"title": "Empowering Investment in Natural Resources", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:19:05.530Z", "description": "Creating a transparent and investor-friendly environment to attract global partnerships in Ethiopia’s mining sector.", "attachment_id": "2d09e28f-7b38-481c-b77f-c8e9b34602ce"}	2026-04-28 22:19:05.532-07
66fbd9a4-b58a-429a-a81e-4bcd96f860ec	\N	CREATE	Attachment	64fd31fe-b3a6-4a9b-9d5a-04bd9842003d	\N	{"file_name": "1777439965285-590268150_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/1777439965285-590268150_financial-growth-investment-success-with-stacks-gold-coins.jpg", "created_at": "2026-04-29T05:19:25.326Z", "uploaded_by": null, "attachment_id": "64fd31fe-b3a6-4a9b-9d5a-04bd9842003d"}	2026-04-28 22:19:25.329-07
14cf1f4e-a8f1-4be1-81de-4c9ca878430e	\N	DELETE	Attachment	2d09e28f-7b38-481c-b77f-c8e9b34602ce	{"file_name": "1777439940161-432801066_global-economic-growth-business-success.jpg", "file_path": "uploads/attachments/1777439940161-432801066_global-economic-growth-business-success.jpg", "created_at": "2026-04-29T05:19:00.179Z", "uploaded_by": null, "attachment_id": "2d09e28f-7b38-481c-b77f-c8e9b34602ce"}	\N	2026-04-28 22:19:25.413-07
90d15637-6068-4ef8-9562-a6d839b0bde4	\N	CREATE	Attachment	fe50ac36-5dcb-422f-bb4a-ac503118faed	\N	{"file_name": "1777439978593-292949641_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/1777439978593-292949641_financial-growth-investment-success-with-stacks-gold-coins.jpg", "created_at": "2026-04-29T05:19:38.614Z", "uploaded_by": null, "attachment_id": "fe50ac36-5dcb-422f-bb4a-ac503118faed"}	2026-04-28 22:19:38.618-07
a315a95c-8d12-4002-a8be-ec0bcb89ce94	00000000-0000-4000-8000-000000000001	UPDATE	Slider	5e06211b-38c9-4b17-963f-5c2fc942b2e1	{"title": "Empowering Investment in Natural Resources", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:19:05.530Z", "description": "Creating a transparent and investor-friendly environment to attract global partnerships in Ethiopia’s mining sector.", "attachment_id": null}	{"title": "Empowering Investment in Natural Resources", "slider_id": "5e06211b-38c9-4b17-963f-5c2fc942b2e1", "created_at": "2026-04-29T05:00:05.767Z", "deleted_at": null, "updated_at": "2026-04-29T05:19:42.464Z", "description": "Creating a transparent and investor-friendly environment to attract global partnerships in Ethiopia’s mining sector.", "attachment_id": "fe50ac36-5dcb-422f-bb4a-ac503118faed"}	2026-04-28 22:19:42.466-07
555a99a6-827a-44a6-9039-1c3080a95b3d	00000000-0000-4000-8000-000000000001	CREATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	\N	{"title": "New Slide Title", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:22:48.680Z", "description": "New slide description goes here.", "attachment_id": null}	2026-04-28 22:22:48.683-07
6f0df17b-5ede-4132-a28c-87ef21b5721e	\N	CREATE	Attachment	f1e69c46-76e4-4ee1-b3d4-c3d54833f6de	\N	{"file_name": "1777440454675-72806225_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/1777440454675-72806225_delicious-candy-looking-like-gems-arrangement.jpg", "created_at": "2026-04-29T05:27:34.747Z", "uploaded_by": null, "attachment_id": "f1e69c46-76e4-4ee1-b3d4-c3d54833f6de"}	2026-04-28 22:27:34.764-07
d984a5c0-23e4-47f1-bb73-5eeec8652cd8	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "New Slide Title", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:22:48.680Z", "description": "New slide description goes here.", "attachment_id": null}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:28:07.423Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "f1e69c46-76e4-4ee1-b3d4-c3d54833f6de"}	2026-04-28 22:28:07.425-07
23540b83-71a6-45a9-8c62-a763a4fc3ca7	\N	CREATE	Attachment	c7e4e546-c8e4-4a37-8bf8-1ac56ca6870e	\N	{"file_name": "1777440494025-349697149_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "file_path": "uploads/attachments/1777440494025-349697149_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "created_at": "2026-04-29T05:28:14.059Z", "uploaded_by": null, "attachment_id": "c7e4e546-c8e4-4a37-8bf8-1ac56ca6870e"}	2026-04-28 22:28:14.062-07
da21fd14-b68c-4a1f-a0f3-69ec6b872aaf	\N	DELETE	Attachment	f1e69c46-76e4-4ee1-b3d4-c3d54833f6de	{"file_name": "1777440454675-72806225_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/1777440454675-72806225_delicious-candy-looking-like-gems-arrangement.jpg", "created_at": "2026-04-29T05:27:34.747Z", "uploaded_by": null, "attachment_id": "f1e69c46-76e4-4ee1-b3d4-c3d54833f6de"}	\N	2026-04-28 22:28:14.142-07
23a4e9c6-f251-4fd7-a435-0f0dcb4f560e	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:28:07.423Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": null}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:28:38.970Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "c7e4e546-c8e4-4a37-8bf8-1ac56ca6870e"}	2026-04-28 22:28:38.972-07
cfebec9c-7040-462c-954a-ea54a6fed8e4	\N	CREATE	Attachment	7499b679-5f32-4172-b451-a00a8ba5d458	\N	{"file_name": "1777440535710-964143474_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/1777440535710-964143474_delicious-candy-looking-like-gems-arrangement.jpg", "created_at": "2026-04-29T05:28:55.761Z", "uploaded_by": null, "attachment_id": "7499b679-5f32-4172-b451-a00a8ba5d458"}	2026-04-28 22:28:55.781-07
e1774077-8528-4122-bba1-5f30f456c7fd	\N	DELETE	Attachment	c7e4e546-c8e4-4a37-8bf8-1ac56ca6870e	{"file_name": "1777440494025-349697149_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "file_path": "uploads/attachments/1777440494025-349697149_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "created_at": "2026-04-29T05:28:14.059Z", "uploaded_by": null, "attachment_id": "c7e4e546-c8e4-4a37-8bf8-1ac56ca6870e"}	\N	2026-04-28 22:28:55.859-07
d3342f76-7111-41d6-b34d-1e9f3d839e0f	00000000-0000-4000-8000-000000000001	CREATE	Footer	4099dfcc-841b-4666-9b62-5b2e076d06db	\N	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T08:51:30.239Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	2026-05-04 01:51:30.243-07
c5e5bdc3-db86-4c43-883b-9cbffc2c84c7	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:28:38.970Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": null}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:29:03.270Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "7499b679-5f32-4172-b451-a00a8ba5d458"}	2026-04-28 22:29:03.271-07
e2609853-3628-4fb9-9315-598dcb3452eb	\N	CREATE	Attachment	18cc5c65-4e3d-43e2-a3cc-594ee103c842	\N	{"file_name": "1777440569875-951836159_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "file_path": "uploads/attachments/1777440569875-951836159_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "created_at": "2026-04-29T05:29:29.899Z", "uploaded_by": null, "attachment_id": "18cc5c65-4e3d-43e2-a3cc-594ee103c842"}	2026-04-28 22:29:29.902-07
cf98df05-7337-400f-b88c-84152222aca2	\N	DELETE	Attachment	7499b679-5f32-4172-b451-a00a8ba5d458	{"file_name": "1777440535710-964143474_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/1777440535710-964143474_delicious-candy-looking-like-gems-arrangement.jpg", "created_at": "2026-04-29T05:28:55.761Z", "uploaded_by": null, "attachment_id": "7499b679-5f32-4172-b451-a00a8ba5d458"}	\N	2026-04-28 22:29:30.001-07
f4be068c-10d2-4578-9dee-3254310462e0	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:29:03.270Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": null}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:29:33.683Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "18cc5c65-4e3d-43e2-a3cc-594ee103c842"}	2026-04-28 22:29:33.686-07
aea9e0e8-f8a4-4634-85a5-62b552d09c6b	\N	CREATE	Attachment	7f5a34a9-3b07-4aa3-af22-d245ea2b876c	\N	{"file_name": "1777441098241-873249871_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "file_path": "uploads/attachments/1777441098241-873249871_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "created_at": "2026-04-29T05:38:18.260Z", "uploaded_by": null, "attachment_id": "7f5a34a9-3b07-4aa3-af22-d245ea2b876c"}	2026-04-28 22:38:18.263-07
edb0ec9a-8d81-4cd6-b2bd-442314f657e8	\N	DELETE	Attachment	18cc5c65-4e3d-43e2-a3cc-594ee103c842	{"file_name": "1777440569875-951836159_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "file_path": "uploads/attachments/1777440569875-951836159_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "created_at": "2026-04-29T05:29:29.899Z", "uploaded_by": null, "attachment_id": "18cc5c65-4e3d-43e2-a3cc-594ee103c842"}	\N	2026-04-28 22:38:18.34-07
7c77149b-a221-49f8-8796-20590976bbff	\N	CREATE	Attachment	058f02be-e6f8-4f5d-8221-0a15afa2ca0e	\N	{"file_name": "1777441104431-353194401_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/1777441104431-353194401_delicious-candy-looking-like-gems-arrangement.jpg", "created_at": "2026-04-29T05:38:24.513Z", "uploaded_by": null, "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	2026-04-28 22:38:24.516-07
84ec5d04-c881-4065-a365-42f7b557bb78	\N	DELETE	Attachment	7f5a34a9-3b07-4aa3-af22-d245ea2b876c	{"file_name": "1777441098241-873249871_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "file_path": "uploads/attachments/1777441098241-873249871_multi-colored-gemstone-collection-showcases-natural-beauty-nature-generated-by-ai.jpg", "created_at": "2026-04-29T05:38:18.260Z", "uploaded_by": null, "attachment_id": "7f5a34a9-3b07-4aa3-af22-d245ea2b876c"}	\N	2026-04-28 22:38:24.578-07
f58ee837-1d25-47e1-afbf-bd40eb5fb53c	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:29:33.683Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": null}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:29.396Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	2026-04-28 22:38:29.398-07
1faf8ee4-bb5d-4ea2-803b-e109fab4cf5e	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:29.396Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:31.698Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	2026-04-28 22:38:31.699-07
6f172363-bb09-4818-86c9-95090ebd9fe7	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:31.698Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:32.245Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	2026-04-28 22:38:32.246-07
e4611a08-5c98-4183-8edd-db3018aec66f	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:55:27.984Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:56:02.416Z"}	2026-05-04 01:56:02.418-07
a7e90684-a590-4982-80b7-13e0f42815cb	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:32.245Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:32.486Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	2026-04-28 22:38:32.487-07
852e841a-0195-4877-ac8a-bb9bfa6e9bab	00000000-0000-4000-8000-000000000001	UPDATE	Slider	97bc6ac2-43aa-473d-ba6b-342f553d3d63	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:32.486Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	{"title": "Harnessing Ethiopia’s Mineral Potential", "slider_id": "97bc6ac2-43aa-473d-ba6b-342f553d3d63", "created_at": "2026-04-29T05:22:48.680Z", "deleted_at": null, "updated_at": "2026-04-29T05:38:32.703Z", "description": "From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.", "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e"}	2026-04-28 22:38:32.704-07
4dec009b-3388-4500-9768-3526d124cb83	00000000-0000-4000-8000-000000000001	CREATE	Slider	68ecddc8-0475-4215-b8f5-2757af1d75c1	\N	{"title": "New Slide Title", "slider_id": "68ecddc8-0475-4215-b8f5-2757af1d75c1", "created_at": "2026-04-29T05:39:14.215Z", "deleted_at": null, "updated_at": "2026-04-29T05:39:14.215Z", "description": "New slide description goes here.", "attachment_id": null}	2026-04-28 22:39:14.217-07
18fe3e5b-81e2-4a54-994d-d532f28455e1	\N	CREATE	Attachment	29a3598c-d576-42c3-aa22-8e8415fb623b	\N	{"file_name": "1777441426422-649197194_communicationcy-open-pit-mining-920200.jpg", "file_path": "uploads/attachments/1777441426422-649197194_communicationcy-open-pit-mining-920200.jpg", "created_at": "2026-04-29T05:43:46.447Z", "uploaded_by": null, "attachment_id": "29a3598c-d576-42c3-aa22-8e8415fb623b"}	2026-04-28 22:43:46.493-07
2ad9f136-fa25-421a-8701-2cd7594608f3	00000000-0000-4000-8000-000000000001	UPDATE	Slider	68ecddc8-0475-4215-b8f5-2757af1d75c1	{"title": "New Slide Title", "slider_id": "68ecddc8-0475-4215-b8f5-2757af1d75c1", "created_at": "2026-04-29T05:39:14.215Z", "deleted_at": null, "updated_at": "2026-04-29T05:39:14.215Z", "description": "New slide description goes here.", "attachment_id": null}	{"title": "Innovation and Excellence in Mining", "slider_id": "68ecddc8-0475-4215-b8f5-2757af1d75c1", "created_at": "2026-04-29T05:39:14.215Z", "deleted_at": null, "updated_at": "2026-04-29T05:43:49.775Z", "description": "Leveraging modern technology and expertise to improve efficiency, safety, and productivity in the mining industry.", "attachment_id": "29a3598c-d576-42c3-aa22-8e8415fb623b"}	2026-04-28 22:43:49.779-07
6f6c7a19-0062-4b7b-adb3-fe841c719f84	00000000-0000-4000-8000-000000000001	UPDATE	Slider	68ecddc8-0475-4215-b8f5-2757af1d75c1	{"title": "Innovation and Excellence in Mining", "slider_id": "68ecddc8-0475-4215-b8f5-2757af1d75c1", "created_at": "2026-04-29T05:39:14.215Z", "deleted_at": null, "updated_at": "2026-04-29T05:43:49.775Z", "description": "Leveraging modern technology and expertise to improve efficiency, safety, and productivity in the mining industry.", "attachment_id": "29a3598c-d576-42c3-aa22-8e8415fb623b"}	{"title": "Innovation and Excellence in Mining", "slider_id": "68ecddc8-0475-4215-b8f5-2757af1d75c1", "created_at": "2026-04-29T05:39:14.215Z", "deleted_at": null, "updated_at": "2026-04-29T05:43:51.532Z", "description": "Leveraging modern technology and expertise to improve efficiency, safety, and productivity in the mining industry.", "attachment_id": "29a3598c-d576-42c3-aa22-8e8415fb623b"}	2026-04-28 22:43:51.533-07
982a3227-9a98-4611-8bd1-f69b6b5ef751	\N	CREATE	Attachment	519dbdc4-1e62-4820-b5ad-06acb7cf979d	\N	{"file_name": "1777441899337-261053355_dump-truck-pit-mine_1.jpg", "file_path": "uploads/attachments/1777441899337-261053355_dump-truck-pit-mine_1.jpg", "created_at": "2026-04-29T05:51:39.399Z", "uploaded_by": null, "attachment_id": "519dbdc4-1e62-4820-b5ad-06acb7cf979d"}	2026-04-28 22:51:39.418-07
06f26f27-80df-43ac-927f-4ad965bfafd3	00000000-0000-4000-8000-000000000001	CREATE	Card	e8deda30-ab07-4d72-8b78-7e48d567fe88	\N	{"title": "Why Invest in Ethiopia?", "card_id": "e8deda30-ab07-4d72-8b78-7e48d567fe88", "button_url": "https://www.mom.gov.et/en/investigating-in-ethiopia", "created_at": "2026-04-29T05:51:43.914Z", "deleted_at": null, "updated_at": "2026-04-29T05:51:43.914Z", "button_name": "Start Exploring", "description": "Discover Ethiopia’s vast mineral potential, strategic location, and growing investment opportunities in the mining sector.", "attachment_id": "519dbdc4-1e62-4820-b5ad-06acb7cf979d"}	2026-04-28 22:51:43.918-07
132a553b-aeeb-4219-82bd-6886f90d7bdb	00000000-0000-4000-8000-000000000001	UPDATE	Card	e8deda30-ab07-4d72-8b78-7e48d567fe88	{"title": "Why Invest in Ethiopia?", "card_id": "e8deda30-ab07-4d72-8b78-7e48d567fe88", "button_url": "https://www.mom.gov.et/en/investigating-in-ethiopia", "created_at": "2026-04-29T05:51:43.914Z", "deleted_at": null, "updated_at": "2026-04-29T05:51:43.914Z", "button_name": "Start Exploring", "description": "Discover Ethiopia’s vast mineral potential, strategic location, and growing investment opportunities in the mining sector.", "attachment_id": "519dbdc4-1e62-4820-b5ad-06acb7cf979d"}	{"title": "Why Invest in Ethiopia?", "card_id": "e8deda30-ab07-4d72-8b78-7e48d567fe88", "button_url": "https://www.mom.gov.et/en/investigating-in-ethiopia", "created_at": "2026-04-29T05:51:43.914Z", "deleted_at": null, "updated_at": "2026-04-29T05:51:46.516Z", "button_name": "Start Exploring", "description": "Discover Ethiopia’s vast mineral potential, strategic location, and growing investment opportunities in the mining sector.", "attachment_id": "519dbdc4-1e62-4820-b5ad-06acb7cf979d"}	2026-04-28 22:51:46.517-07
49d0ab86-0e36-4f84-9311-844b9322514a	\N	CREATE	Attachment	6f6d7aa5-1f62-48e2-9944-25d3688342e0	\N	{"file_name": "1777442279809-2245219_world-bank-logo.png", "file_path": "uploads/attachments/1777442279809-2245219_world-bank-logo.png", "created_at": "2026-04-29T05:57:59.811Z", "uploaded_by": null, "attachment_id": "6f6d7aa5-1f62-48e2-9944-25d3688342e0"}	2026-04-28 22:57:59.814-07
ab6ada4c-ce2f-4d21-88bd-bd90bc3a11a4	00000000-0000-4000-8000-000000000001	CREATE	Partner	a37c20a1-d03a-4834-ab05-5fc92cf81322	\N	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-04-29T05:58:22.473Z", "description": "International Partners in Ethiopia’s Mining Sector"}	2026-04-28 22:58:22.475-07
b01c506f-bb53-4d71-bd8a-43d893dce597	\N	CREATE	Attachment	2071c280-24f5-4c27-92d8-6571077d58eb	\N	{"file_name": "1777442369804-155274116_african-development-fund-logo-png_seeklogo-508981.png", "file_path": "uploads/attachments/1777442369804-155274116_african-development-fund-logo-png_seeklogo-508981.png", "created_at": "2026-04-29T05:59:29.805Z", "uploaded_by": null, "attachment_id": "2071c280-24f5-4c27-92d8-6571077d58eb"}	2026-04-28 22:59:29.826-07
8b356f70-bf65-4aa6-9c50-baebdc6e130f	\N	CREATE	Attachment	24c71477-1316-4e6d-b991-8afdfc122b86	\N	{"file_name": "1777442494906-38160186_images.png", "file_path": "uploads/attachments/1777442494906-38160186_images.png", "created_at": "2026-04-29T06:01:34.907Z", "uploaded_by": null, "attachment_id": "24c71477-1316-4e6d-b991-8afdfc122b86"}	2026-04-28 23:01:34.938-07
e29e0cbd-a5f4-40f1-b2d1-d8f71aeb5abd	00000000-0000-4000-8000-000000000001	UPDATE	Partner	a37c20a1-d03a-4834-ab05-5fc92cf81322	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-04-29T05:58:22.473Z", "description": "International Partners in Ethiopia’s Mining Sector"}	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-04-29T06:01:39.682Z", "description": "International Partners in Ethiopia’s Mining Sector"}	2026-04-28 23:01:39.683-07
d71c35ff-1607-42a2-a422-479f6ad055ad	\N	CREATE	Attachment	e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d	\N	{"file_name": "1777442709741-638605964_map.jpg", "file_path": "uploads/attachments/1777442709741-638605964_map.jpg", "created_at": "2026-04-29T06:05:09.786Z", "uploaded_by": null, "attachment_id": "e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d"}	2026-04-28 23:05:09.79-07
e19ba293-d817-4de9-ac11-c10b3f55f466	\N	CREATE	Attachment	4cf2ad22-6c15-49c7-9e68-565d65ee6d07	\N	{"file_name": "1777442767269-263028424_home-2.jpg", "file_path": "uploads/attachments/1777442767269-263028424_home-2.jpg", "created_at": "2026-04-29T06:06:07.299Z", "uploaded_by": null, "attachment_id": "4cf2ad22-6c15-49c7-9e68-565d65ee6d07"}	2026-04-28 23:06:07.302-07
3e08ad33-8b38-402f-abcd-0b4aa3b0cdb1	00000000-0000-4000-8000-000000000001	CREATE	Background	387e059c-efaa-49f8-b112-c939acae1e3c	\N	{"icon": "Globe2", "title": "Ministry Background", "content": "The Ministry of Mines of Ethiopia is the government body responsible for regulating, promoting, and developing the country’s mineral resources. It plays a key role in ensuring that mining activities are conducted efficiently, transparently, and in a way that benefits both the economy and local communities.\\n\\nWith a strong focus on sustainability and investment, the Ministry works to attract responsible investors, support innovation in the mining sector, and ensure that Ethiopia’s natural resources are utilized for long-term national development. From policy formulation to licensing and monitoring, the Ministry is committed to building a modern, competitive, and environmentally responsible mining industry.", "description": "Established to regulate and develop Ethiopia's mineral and petroleum resources for sustainable economic growth and national development.", "background_id": "387e059c-efaa-49f8-b112-c939acae1e3c"}	2026-04-28 23:06:12.77-07
2846cea4-de22-4129-a158-2a51053ef6e1	00000000-0000-4000-8000-000000000001	UPDATE	Background	387e059c-efaa-49f8-b112-c939acae1e3c	{"icon": "Globe2", "title": "Ministry Background", "content": "The Ministry of Mines of Ethiopia is the government body responsible for regulating, promoting, and developing the country’s mineral resources. It plays a key role in ensuring that mining activities are conducted efficiently, transparently, and in a way that benefits both the economy and local communities.\\n\\nWith a strong focus on sustainability and investment, the Ministry works to attract responsible investors, support innovation in the mining sector, and ensure that Ethiopia’s natural resources are utilized for long-term national development. From policy formulation to licensing and monitoring, the Ministry is committed to building a modern, competitive, and environmentally responsible mining industry.", "description": "Established to regulate and develop Ethiopia's mineral and petroleum resources for sustainable economic growth and national development.", "background_id": "387e059c-efaa-49f8-b112-c939acae1e3c"}	{"icon": "Globe2", "title": "Ministry Background", "content": "The Ministry of Mines of Ethiopia is responsible for managing and developing the nation’s mineral resources. It promotes sustainable mining, ensures transparent regulation, and supports investment to drive economic growth and national development.", "description": "Established to regulate and develop Ethiopia's mineral and petroleum resources for sustainable economic growth and national development.", "background_id": "387e059c-efaa-49f8-b112-c939acae1e3c"}	2026-04-28 23:06:56.941-07
7e7226f2-4cf6-478a-bab7-ac0fe6a9b1f5	\N	CREATE	Attachment	bed2b9fc-17d5-4ddf-89b0-c6522c2da72c	\N	{"file_name": "1777443023002-366671770_goal.png", "file_path": "uploads/attachments/1777443023002-366671770_goal.png", "created_at": "2026-04-29T06:10:23.003Z", "uploaded_by": null, "attachment_id": "bed2b9fc-17d5-4ddf-89b0-c6522c2da72c"}	2026-04-28 23:10:23.028-07
d24a63e6-6f1d-43da-8c5c-4cbdafabee74	\N	CREATE	Attachment	737ce471-6078-4c06-9cb5-4e2912dd6ba7	\N	{"file_name": "1777443027454-83419380_witness.png", "file_path": "uploads/attachments/1777443027454-83419380_witness.png", "created_at": "2026-04-29T06:10:27.455Z", "uploaded_by": null, "attachment_id": "737ce471-6078-4c06-9cb5-4e2912dd6ba7"}	2026-04-28 23:10:27.459-07
deaf797b-4573-41df-9df6-664521ffd764	\N	CREATE	Attachment	f11861df-6e14-4dae-8c30-a2031626751a	\N	{"file_name": "1777443032701-299833419_diamond.png", "file_path": "uploads/attachments/1777443032701-299833419_diamond.png", "created_at": "2026-04-29T06:10:32.702Z", "uploaded_by": null, "attachment_id": "f11861df-6e14-4dae-8c30-a2031626751a"}	2026-04-28 23:10:32.706-07
96c75cea-8c92-4261-a5fb-353ffcc6e29d	00000000-0000-4000-8000-000000000001	CREATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	\N	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-04-29T06:11:02.393Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-04-28 23:11:02.395-07
359ecdfe-61df-49ca-80bf-93d9f82b985e	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-04-29T06:11:02.393Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-04-29T06:12:19.074Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-04-28 23:12:19.075-07
f78da8e8-c1a8-4c7b-ab61-761c1b8a92db	\N	CREATE	Attachment	b9e92df0-a3d1-4f86-b6fa-c439e6160b38	\N	{"file_name": "1777443351192-184025141_futuristic-smart-city-with-5g-global-network-technology.jpg", "file_path": "uploads/attachments/1777443351192-184025141_futuristic-smart-city-with-5g-global-network-technology.jpg", "created_at": "2026-04-29T06:15:51.262Z", "uploaded_by": null, "attachment_id": "b9e92df0-a3d1-4f86-b6fa-c439e6160b38"}	2026-04-28 23:15:51.265-07
67f31d50-2a6d-4f71-92cf-1d0db25f581c	\N	DELETE	Attachment	4cf2ad22-6c15-49c7-9e68-565d65ee6d07	{"file_name": "1777442767269-263028424_home-2.jpg", "file_path": "uploads/attachments/1777442767269-263028424_home-2.jpg", "created_at": "2026-04-29T06:06:07.299Z", "uploaded_by": null, "attachment_id": "4cf2ad22-6c15-49c7-9e68-565d65ee6d07"}	\N	2026-04-28 23:15:51.338-07
b507feca-ac23-4db1-8a69-0624036c8fae	\N	CREATE	Attachment	2683be44-e55d-4fe1-bcc4-ecf12c25fb96	\N	{"file_name": "1777449349261-464739902_habtamu-tegegn-profile.jpg", "file_path": "uploads/attachments/1777449349261-464739902_habtamu-tegegn-profile.jpg", "created_at": "2026-04-29T07:55:49.275Z", "uploaded_by": null, "attachment_id": "2683be44-e55d-4fe1-bcc4-ecf12c25fb96"}	2026-04-29 00:55:49.294-07
35a4c0e5-bf90-47e7-9101-e8f7a2f0430d	\N	DELETE	Attachment	53cb4a79-bbdd-44bd-92cf-00db104db810	{"file_name": "1777884861045-936106106_asm.png", "file_path": "uploads/attachments/1777884861045-936106106_asm.png", "created_at": "2026-05-04T08:54:21.047Z", "uploaded_by": null, "attachment_id": "53cb4a79-bbdd-44bd-92cf-00db104db810"}	\N	2026-05-04 01:56:05.168-07
b396a242-5d26-421f-add6-6658394aac83	00000000-0000-4000-8000-000000000001	CREATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	\N	{"name": "HE. Habtamu Tegegne", "level": 1, "title": "Minster of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-04-29T07:58:50.487Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-04-29 00:58:50.49-07
e395bcd7-a769-4e78-baa8-675f55ac635d	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-04-29T06:12:19.074Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-04-29T08:08:12.910Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-04-29 01:08:12.912-07
4df1a33b-b31f-4ba6-a9fd-d6980bc09de7	00000000-0000-4000-8000-000000000001	UPDATE	Partner	a37c20a1-d03a-4834-ab05-5fc92cf81322	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-04-29T06:01:39.682Z", "description": "International Partners in Ethiopia’s Mining Sector"}	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-04-29T08:17:28.855Z", "description": "International Partners in Ethiopia’s Mining Sector"}	2026-04-29 01:17:28.857-07
95adbf37-e662-4d34-993b-7dc89332c77a	00000000-0000-4000-8000-000000000001	CREATE	FederalOfficeContact	7dbfde0c-0da0-46bd-b6ad-cc03481e2581	\N	{"email": "info@mom.gov.et", "phone": "01166754806", "created_at": "2026-04-29T11:17:27.061Z", "deleted_at": null, "updated_at": "2026-04-29T11:17:27.061Z", "map_location": "https://maps.app.goo.gl/BSFARs8Ta2eNBGvY9", "office_address": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "federal_office_id": "7dbfde0c-0da0-46bd-b6ad-cc03481e2581"}	2026-04-29 04:17:27.066-07
6185abc3-a6ac-46c0-b9ab-e7739ca0c4bc	00000000-0000-4000-8000-000000000001	UPDATE	FederalOfficeContact	7dbfde0c-0da0-46bd-b6ad-cc03481e2581	{"email": "info@mom.gov.et", "phone": "01166754806", "created_at": "2026-04-29T11:17:27.061Z", "deleted_at": null, "updated_at": "2026-04-29T11:17:27.061Z", "map_location": "https://maps.app.goo.gl/BSFARs8Ta2eNBGvY9", "office_address": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "federal_office_id": "7dbfde0c-0da0-46bd-b6ad-cc03481e2581"}	{"email": "info@mom.gov.et", "phone": "01166754806", "created_at": "2026-04-29T11:17:27.061Z", "deleted_at": null, "updated_at": "2026-04-29T11:18:07.115Z", "map_location": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "office_address": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "federal_office_id": "7dbfde0c-0da0-46bd-b6ad-cc03481e2581"}	2026-04-29 04:18:07.117-07
9160ef8a-45dc-4e8e-a248-ba95e1575210	00000000-0000-4000-8000-000000000001	UPDATE	FederalOfficeContact	7dbfde0c-0da0-46bd-b6ad-cc03481e2581	{"email": "info@mom.gov.et", "phone": "01166754806", "created_at": "2026-04-29T11:17:27.061Z", "deleted_at": null, "updated_at": "2026-04-29T11:18:07.115Z", "map_location": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "office_address": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "federal_office_id": "7dbfde0c-0da0-46bd-b6ad-cc03481e2581"}	{"email": "info@mom.gov.et", "phone": "01166754806 | 0116675524 | 0116675622", "created_at": "2026-04-29T11:17:27.061Z", "deleted_at": null, "updated_at": "2026-04-29T11:19:21.585Z", "map_location": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "office_address": "Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት", "federal_office_id": "7dbfde0c-0da0-46bd-b6ad-cc03481e2581"}	2026-04-29 04:19:21.587-07
ea9f1c87-bdbb-4530-9346-68c01942d1f6	\N	CREATE	Attachment	c09db559-9b29-49d3-9ffa-b75700d7a95d	\N	{"file_name": "1777461893080-617149355_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/1777461893080-617149355_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "created_at": "2026-04-29T11:24:53.082Z", "uploaded_by": null, "attachment_id": "c09db559-9b29-49d3-9ffa-b75700d7a95d"}	2026-04-29 04:24:53.106-07
ed8d2e5f-8b6c-4da9-8e65-d36c5c9cc0e9	\N	CREATE	Attachment	23826669-254d-4cbf-b243-35dd65f61530	\N	{"file_name": "1777462258323-561097579_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/1777462258323-561097579_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "created_at": "2026-04-29T11:30:58.326Z", "uploaded_by": null, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530"}	2026-04-29 04:30:58.348-07
b7aedd87-b275-4051-9845-e2f3d60c841d	00000000-0000-4000-8000-000000000001	CREATE	Snapshot	c1e29fea-cb5b-4468-a7c3-a79458806404	\N	{"title": "Ministry of Mines (MoM)", "sector": "mining", "created_at": "2026-04-29T11:32:04.544Z", "deleted_at": null, "updated_at": "2026-04-29T11:32:04.544Z", "snapshot_id": "c1e29fea-cb5b-4468-a7c3-a79458806404", "is_published": false, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "description_one": "Driving Sustainable Growth Through Ethiopia’s Mineral Resources", "description_two": "The Ministry of Mines is a key government institution responsible for regulating and developing Ethiopia’s mining and petroleum sectors. Reestablished under Proclamation No. 1097/2018, the Ministry plays a central role in granting exploration and mining licenses, promoting investment, and ensuring sustainable resource management. As part of Ethiopia’s homegrown economic reform agenda, the Ministry is committed to modernizing the sector, enhancing transparency, and positioning the country as a leading destination for global investors.", "attachment_description": "FDRE Ministry of Mines"}	2026-04-29 04:32:04.547-07
2d894f0a-36b0-4faf-ba9f-2df5bc6e6e00	00000000-0000-4000-8000-000000000001	UPDATE	Snapshot	c1e29fea-cb5b-4468-a7c3-a79458806404	{"title": "Ministry of Mines (MoM)", "sector": "mining", "created_at": "2026-04-29T11:32:04.544Z", "deleted_at": null, "updated_at": "2026-04-29T11:32:04.544Z", "snapshot_id": "c1e29fea-cb5b-4468-a7c3-a79458806404", "is_published": false, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "description_one": "Driving Sustainable Growth Through Ethiopia’s Mineral Resources", "description_two": "The Ministry of Mines is a key government institution responsible for regulating and developing Ethiopia’s mining and petroleum sectors. Reestablished under Proclamation No. 1097/2018, the Ministry plays a central role in granting exploration and mining licenses, promoting investment, and ensuring sustainable resource management. As part of Ethiopia’s homegrown economic reform agenda, the Ministry is committed to modernizing the sector, enhancing transparency, and positioning the country as a leading destination for global investors.", "attachment_description": "FDRE Ministry of Mines"}	{"title": "Ministry of Mines (MoM)", "sector": "mining", "created_at": "2026-04-29T11:32:04.544Z", "deleted_at": null, "updated_at": "2026-04-29T11:32:09.309Z", "snapshot_id": "c1e29fea-cb5b-4468-a7c3-a79458806404", "is_published": true, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "description_one": "Driving Sustainable Growth Through Ethiopia’s Mineral Resources", "description_two": "The Ministry of Mines is a key government institution responsible for regulating and developing Ethiopia’s mining and petroleum sectors. Reestablished under Proclamation No. 1097/2018, the Ministry plays a central role in granting exploration and mining licenses, promoting investment, and ensuring sustainable resource management. As part of Ethiopia’s homegrown economic reform agenda, the Ministry is committed to modernizing the sector, enhancing transparency, and positioning the country as a leading destination for global investors.", "attachment_description": "FDRE Ministry of Mines"}	2026-04-29 04:32:09.311-07
0f0c2a5f-79ad-41a3-92fd-8b9f1d052020	00000000-0000-4000-8000-000000000001	UPDATE	Snapshot	c1e29fea-cb5b-4468-a7c3-a79458806404	{"title": "Ministry of Mines (MoM)", "sector": "mining", "created_at": "2026-04-29T11:32:04.544Z", "deleted_at": null, "updated_at": "2026-04-29T11:32:09.309Z", "snapshot_id": "c1e29fea-cb5b-4468-a7c3-a79458806404", "is_published": true, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "description_one": "Driving Sustainable Growth Through Ethiopia’s Mineral Resources", "description_two": "The Ministry of Mines is a key government institution responsible for regulating and developing Ethiopia’s mining and petroleum sectors. Reestablished under Proclamation No. 1097/2018, the Ministry plays a central role in granting exploration and mining licenses, promoting investment, and ensuring sustainable resource management. As part of Ethiopia’s homegrown economic reform agenda, the Ministry is committed to modernizing the sector, enhancing transparency, and positioning the country as a leading destination for global investors.", "attachment_description": "FDRE Ministry of Mines"}	{"title": "Ministry of Mines (MoM)", "sector": "mining", "created_at": "2026-04-29T11:32:04.544Z", "deleted_at": null, "updated_at": "2026-04-29T11:34:05.808Z", "snapshot_id": "c1e29fea-cb5b-4468-a7c3-a79458806404", "is_published": true, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "description_one": "Driving Sustainable Growth Through Ethiopia’s Mineral Resources", "description_two": "The Ministry of Mines is a key government institution responsible for regulating and developing Ethiopia’s mining and petroleum sectors. Reestablished under Proclamation No. 1097/2018, the Ministry plays a central role in granting exploration and mining licenses, promoting investment, and ensuring sustainable resource management. As part of Ethiopia’s homegrown economic reform agenda, the Ministry is committed to modernizing the sector, enhancing transparency, and positioning the country as a leading destination for global investors.", "attachment_description": "FDRE Ministry of Mines"}	2026-04-29 04:34:05.81-07
770b6348-93c5-4f9b-bb4d-0d2af22bcb0b	\N	CREATE	Attachment	b9a14b06-705e-4988-88ab-d32f5787dc56	\N	{"file_name": "1777463539897-492898137_54290.jpg", "file_path": "uploads/attachments/1777463539897-492898137_54290.jpg", "created_at": "2026-04-29T11:52:19.920Z", "uploaded_by": null, "attachment_id": "b9a14b06-705e-4988-88ab-d32f5787dc56"}	2026-04-29 04:52:19.942-07
dc99d3be-dfa0-4e61-80a9-a5c8dae751fb	\N	CREATE	Attachment	7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	\N	{"file_name": "1777464319213-655797989_54290.jpg", "file_path": "uploads/attachments/1777464319213-655797989_54290.jpg", "created_at": "2026-04-29T12:05:19.230Z", "uploaded_by": null, "attachment_id": "7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45"}	2026-04-29 05:05:19.245-07
7b44f841-c9fa-409b-9175-e48c85285ece	\N	CREATE	Attachment	3afacb79-8d28-4c0d-b6ad-42ac284dad05	\N	{"file_name": "1777464503395-88029341_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/1777464503395-88029341_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "created_at": "2026-04-29T12:08:23.396Z", "uploaded_by": null, "attachment_id": "3afacb79-8d28-4c0d-b6ad-42ac284dad05"}	2026-04-29 05:08:23.421-07
fd79123e-48ca-4364-81b0-3062b1ffcdbb	\N	CREATE	Attachment	0db1123d-12cc-4bfe-82d0-5760a7f7e8db	\N	{"file_name": "1777464503690-388155409_images.png", "file_path": "uploads/attachments/1777464503690-388155409_images.png", "created_at": "2026-04-29T12:08:23.691Z", "uploaded_by": null, "attachment_id": "0db1123d-12cc-4bfe-82d0-5760a7f7e8db"}	2026-04-29 05:08:23.695-07
8821c742-cac3-4cc5-be4b-fed31d2ec19b	\N	CREATE	Attachment	9667d5ce-718e-42fd-9cad-db271263a6eb	\N	{"file_name": "1777464504585-579720602_futuristic-smart-city-with-5g-global-network-technology.jpg", "file_path": "uploads/attachments/1777464504585-579720602_futuristic-smart-city-with-5g-global-network-technology.jpg", "created_at": "2026-04-29T12:08:24.632Z", "uploaded_by": null, "attachment_id": "9667d5ce-718e-42fd-9cad-db271263a6eb"}	2026-04-29 05:08:24.634-07
2c310182-48fa-49b8-bc6f-b6cf50e9c750	00000000-0000-4000-8000-000000000001	CREATE	MiningRegulationProcess	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	\N	{"title": "Mining Licensing and Legislations", "publish": false, "createdAt": "2026-04-29T12:09:03.759Z", "updatedAt": "2026-04-29T12:09:03.759Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-04-29T12:09:03.759Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:09:03.761-07
f0a142f4-9c9f-4a24-8cb6-96e2a9e8ea29	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	757f7db0-17d0-4bd6-8912-c519954263fb	\N	{"icon": "ArrowUpLeftSquareIcon", "title": "Operational Guidelines", "createdAt": "2026-04-29T12:09:03.767Z", "updatedAt": "2026-04-29T12:09:03.767Z", "created_at": "2026-04-29T12:09:03.767Z", "deleted_at": null, "updated_at": "2026-04-29T12:09:03.767Z", "description": "We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties", "mining_guideline_id": "757f7db0-17d0-4bd6-8912-c519954263fb", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:09:03.768-07
49c29c7a-9d25-4f85-acd5-2a832e641297	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	7e7a8f03-0fda-48bf-9cba-07503e6f67ec	\N	{"icon": "FileChartColumnIncreasingIcon", "title": "Important Directives", "createdAt": "2026-04-29T12:09:03.771Z", "updatedAt": "2026-04-29T12:09:03.771Z", "created_at": "2026-04-29T12:09:03.771Z", "deleted_at": null, "updated_at": "2026-04-29T12:09:03.771Z", "description": null, "mining_guideline_id": "7e7a8f03-0fda-48bf-9cba-07503e6f67ec", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:09:03.772-07
ee1af531-b59d-41bd-8392-c9f0b66a602e	00000000-0000-4000-8000-000000000001	CREATE	MiningService	8812cd21-83d1-491b-b804-f0a76f6d6bbf	\N	{"title": "Licensing  Service", "createdAt": "2026-04-29T12:09:03.775Z", "updatedAt": "2026-04-29T12:09:03.775Z", "created_at": "2026-04-29T12:09:03.775Z", "deleted_at": null, "updated_at": "2026-04-29T12:09:03.775Z", "description": "The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:", "mining_service_id": "8812cd21-83d1-491b-b804-f0a76f6d6bbf", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:09:03.776-07
d6934495-fc2b-465f-b65b-81e815eaf7a7	00000000-0000-4000-8000-000000000001	UPDATE	MiningRegulationProcess	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	{"title": "Mining Licensing and Legislations", "publish": false, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-04-29T12:09:03.759Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-04-29T12:09:03.759Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	{"title": "Mining Licensing and Legislations", "publish": true, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-04-29T12:10:13.651Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-04-29T12:10:13.651Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:10:13.653-07
c1ccbe46-5442-4271-99aa-372bd7c5c5cc	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	c8092019-b2e9-4f39-bc3f-608a1f22b034	\N	{"icon": "FileChartColumnIncreasingIcon", "title": "Important Directives", "createdAt": "2026-04-29T12:10:13.661Z", "updatedAt": "2026-04-29T12:10:13.661Z", "created_at": "2026-04-29T12:10:13.661Z", "deleted_at": null, "updated_at": "2026-04-29T12:10:13.661Z", "description": null, "mining_guideline_id": "c8092019-b2e9-4f39-bc3f-608a1f22b034", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:10:13.662-07
8076e02e-9d53-404c-bbef-0b058c35c5a7	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	b2fbf997-0ce4-4921-99e0-4269a78786df	\N	{"icon": "ArrowUpLeftSquareIcon", "title": "Operational Guidelines", "createdAt": "2026-04-29T12:10:13.665Z", "updatedAt": "2026-04-29T12:10:13.665Z", "created_at": "2026-04-29T12:10:13.665Z", "deleted_at": null, "updated_at": "2026-04-29T12:10:13.665Z", "description": "We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties", "mining_guideline_id": "b2fbf997-0ce4-4921-99e0-4269a78786df", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:10:13.666-07
4065488c-4072-465b-b783-5f48f2f27192	00000000-0000-4000-8000-000000000001	CREATE	MiningService	af1086ab-d7e7-4c5e-ac98-30aa76a3fdc8	\N	{"title": "Licensing  Service", "createdAt": "2026-04-29T12:10:13.669Z", "updatedAt": "2026-04-29T12:10:13.669Z", "created_at": "2026-04-29T12:10:13.669Z", "deleted_at": null, "updated_at": "2026-04-29T12:10:13.669Z", "description": "The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:", "mining_service_id": "af1086ab-d7e7-4c5e-ac98-30aa76a3fdc8", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:10:13.669-07
843b1ee8-501f-4ffc-8f6f-54b1f6e1b6ea	00000000-0000-4000-8000-000000000001	UPDATE	MiningRegulationProcess	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	{"title": "Mining Licensing and Legislations", "publish": true, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-04-29T12:10:13.651Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-04-29T12:10:13.651Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	{"title": "Mining Licensing and Legislations", "publish": false, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-04-29T12:30:47.725Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-04-29T12:30:47.724Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:30:47.726-07
12249196-e88e-4849-ae39-2c7383b9849e	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	804201d0-c381-4e3c-b1c6-1ae46b403855	\N	{"icon": "FileChartColumnIncreasingIcon", "title": "Important Directives", "createdAt": "2026-04-29T12:30:47.731Z", "updatedAt": "2026-04-29T12:30:47.731Z", "created_at": "2026-04-29T12:30:47.731Z", "deleted_at": null, "updated_at": "2026-04-29T12:30:47.731Z", "description": null, "mining_guideline_id": "804201d0-c381-4e3c-b1c6-1ae46b403855", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:30:47.732-07
452e7f70-d33d-455b-bd07-9b449f1c535c	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	bf4aac2e-92d3-4828-b201-6d6197f6ec6a	\N	{"icon": "ArrowUpLeftSquareIcon", "title": "Operational Guidelines", "createdAt": "2026-04-29T12:30:47.734Z", "updatedAt": "2026-04-29T12:30:47.734Z", "created_at": "2026-04-29T12:30:47.734Z", "deleted_at": null, "updated_at": "2026-04-29T12:30:47.734Z", "description": "We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties", "mining_guideline_id": "bf4aac2e-92d3-4828-b201-6d6197f6ec6a", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:30:47.735-07
40ea95d4-fc60-485d-8427-734a0212be2f	00000000-0000-4000-8000-000000000001	CREATE	MiningService	33adf720-28c4-4bf1-89be-f3865a85d87c	\N	{"title": "Licensing  Service", "createdAt": "2026-04-29T12:30:47.737Z", "updatedAt": "2026-04-29T12:30:47.737Z", "created_at": "2026-04-29T12:30:47.737Z", "deleted_at": null, "updated_at": "2026-04-29T12:30:47.737Z", "description": "The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:", "mining_service_id": "33adf720-28c4-4bf1-89be-f3865a85d87c", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-04-29 05:30:47.738-07
ce85e8bd-3093-4eda-8f14-51e756c8a2c6	\N	CREATE	Message	5debbf8e-a889-46d0-9671-994c36f7e243	\N	{"message": "Dear Ministry of Mines,\\nI am writing to kindly request access to the latest official Minimum Price List of Minerals published by your office. This document is important for ensuring compliance with regulations and for guiding investment decisions in the mining sector.\\nCould you please provide me with the most recent version of the list, or direct me to the appropriate department or portal where it can be obtained?\\nThank you very much for your assistance.\\nBest regards, Natan ", "subject": "Request for latest Minimum price list for minerals", "full_name": "Natan Mesele", "created_at": "2026-05-04T07:24:48.241Z", "deleted_at": null, "message_id": "5debbf8e-a889-46d0-9671-994c36f7e243", "updated_at": "2026-05-04T07:24:48.241Z", "email_address": "natanmesele827@gmail.com"}	2026-05-04 00:24:48.251-07
69245dbf-b0eb-409f-ba39-d8542fe93582	\N	CREATE	Attachment	eaa30a4e-8d65-4315-9db3-7e0c2646681f	\N	{"file_name": "1777880869064-836538035_4.png", "file_path": "uploads/attachments/1777880869064-836538035_4.png", "created_at": "2026-05-04T07:47:49.080Z", "uploaded_by": null, "attachment_id": "eaa30a4e-8d65-4315-9db3-7e0c2646681f"}	2026-05-04 00:47:49.104-07
fe824d8e-9f7c-48c1-b0bc-e9cccd7296c8	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. Habtamu Tegegne", "level": 1, "title": "Minster of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-04-29T07:58:50.487Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:49:37.917Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:49:37.919-07
e89e5776-c9c2-46df-9ddc-b9eecf9f7c5c	\N	CREATE	Attachment	bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5	\N	{"file_name": "1777880993442-375407335_4.png", "file_path": "uploads/attachments/1777880993442-375407335_4.png", "created_at": "2026-05-04T07:49:53.458Z", "uploaded_by": null, "attachment_id": "bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5"}	2026-05-04 00:49:53.487-07
892d22f1-66ad-48da-850d-ce6aac7ef02f	\N	CREATE	Attachment	30b8514a-5df6-459b-8a88-f122d28f3820	\N	{"file_name": "1777881032210-652444803_3.png", "file_path": "uploads/attachments/1777881032210-652444803_3.png", "created_at": "2026-05-04T07:50:32.228Z", "uploaded_by": null, "attachment_id": "30b8514a-5df6-459b-8a88-f122d28f3820"}	2026-05-04 00:50:32.231-07
278ac3c4-2234-43d8-915b-72d114e1de80	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.849Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StatMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.974Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StaMinister of Mines for the petroleum sector.e", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:54.975-07
60e5e978-87c6-4b96-a100-8a80be844ef7	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:49:37.917Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:33.629Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:33.63-07
9e7b7c88-d191-43b8-8cdc-b47bebd9dfb7	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:33.629Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EnHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:33.799Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:33.801-07
504b3bdc-bb2d-482c-87a3-e1922d90a58c	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EnHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:33.799Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EngHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:34.051Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:34.053-07
d774251f-fbca-4b86-9299-8c454f8b9e6b	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EngHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:34.051Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. Eng Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:34.177Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:34.178-07
16d56417-e534-4157-99bc-f8b925179f7e	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. Eng Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:34.177Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EngHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:39.485Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:39.486-07
4b29a8f0-9f5d-44db-8bba-359775c2a7cf	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EngHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:39.485Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EngiHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.301Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:40.302-07
6c7eda45-a292-4acd-b814-a5e50949eb3a	\N	DELETE	Attachment	2b6491ba-d66d-4261-b666-7ca8194ab397	{"file_name": "1777881166086-553179802_4.png", "file_path": "uploads/attachments/1777881166086-553179802_4.png", "created_at": "2026-05-04T07:52:46.101Z", "uploaded_by": null, "attachment_id": "2b6491ba-d66d-4261-b666-7ca8194ab397"}	\N	2026-05-04 01:05:09.55-07
d67d0b7b-fb80-49a7-af36-2b9cc0ef925f	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EngiHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.301Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EnginHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.465Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:40.466-07
6fd7a03e-0608-4213-b3f1-797bdd466eb7	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EnginHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.465Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EngineHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.630Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:40.632-07
193266af-9f92-49d2-b78d-88c61ba636a2	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EngineHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.630Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. EnginerHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.831Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:40.832-07
23d97578-5b21-4624-990c-7269cd0de74c	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. EnginerHabtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.831Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. Enginer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.942Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:40.943-07
343c653b-6bc4-4ea1-bfb2-ee8f43e507f3	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. Enginer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:40.942Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. Engineer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:48.274Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 00:51:48.276-07
48491106-d624-4c0b-b6dc-9580ea61ee0d	\N	CREATE	Attachment	cc26cba9-36e4-4d77-bc9d-daf628d5b05d	\N	{"file_name": "1777881124428-266870959_4.png", "file_path": "uploads/attachments/1777881124428-266870959_4.png", "created_at": "2026-05-04T07:52:04.445Z", "uploaded_by": null, "attachment_id": "cc26cba9-36e4-4d77-bc9d-daf628d5b05d"}	2026-05-04 00:52:04.449-07
01edae98-7d49-4db5-b9ac-343a44c077fd	\N	CREATE	Attachment	2b6491ba-d66d-4261-b666-7ca8194ab397	\N	{"file_name": "1777881166086-553179802_4.png", "file_path": "uploads/attachments/1777881166086-553179802_4.png", "created_at": "2026-05-04T07:52:46.101Z", "uploaded_by": null, "attachment_id": "2b6491ba-d66d-4261-b666-7ca8194ab397"}	2026-05-04 00:52:46.124-07
2b4610f3-a405-4f63-bd5a-4ea004ab1f07	00000000-0000-4000-8000-000000000001	CREATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	\N	{"name": "HE. Birhanie Yadesa", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T07:54:28.356Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader and Prosperity Party member, focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 00:54:28.358-07
8d83e41e-4195-4be2-93c7-fa8f5f08c13a	00000000-0000-4000-8000-000000000001	CREATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	\N	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:13:43.598Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:13:43.6-07
3a4e35e1-caa9-4a3b-86bb-7d8cfb3656f8	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Birhanie Yadesa", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T07:54:28.356Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader and Prosperity Party member, focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Birhanie Yadesa", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T07:55:26.099Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 00:55:26.101-07
19ebbdce-b8b8-4cfa-bc17-13ac6882a864	\N	CREATE	Attachment	4a733b9b-e8d6-42e0-8a4a-2d8d008bb103	\N	{"file_name": "1777881372604-676518809_4.png", "file_path": "uploads/attachments/1777881372604-676518809_4.png", "created_at": "2026-05-04T07:56:12.622Z", "uploaded_by": null, "attachment_id": "4a733b9b-e8d6-42e0-8a4a-2d8d008bb103"}	2026-05-04 00:56:12.643-07
6668c476-5222-4a17-9100-ea913d95f05e	\N	CREATE	Attachment	8174a7d9-cafa-4bef-a257-5c9c9e38e7c8	\N	{"file_name": "1777881379454-113371585_3.png", "file_path": "uploads/attachments/1777881379454-113371585_3.png", "created_at": "2026-05-04T07:56:19.469Z", "uploaded_by": null, "attachment_id": "8174a7d9-cafa-4bef-a257-5c9c9e38e7c8"}	2026-05-04 00:56:19.472-07
993ce696-d033-4d62-9a0d-8eb7ca2e0bf4	\N	DELETE	Attachment	4a733b9b-e8d6-42e0-8a4a-2d8d008bb103	{"file_name": "1777881372604-676518809_4.png", "file_path": "uploads/attachments/1777881372604-676518809_4.png", "created_at": "2026-05-04T07:56:12.622Z", "uploaded_by": null, "attachment_id": "4a733b9b-e8d6-42e0-8a4a-2d8d008bb103"}	\N	2026-05-04 00:56:19.553-07
047df177-37b5-4116-802e-e49c9651a9df	00000000-0000-4000-8000-000000000001	CREATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	\N	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:08.335Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and Deputy Minister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:08.338-07
7c4b879f-f432-494e-8cdb-bada660abe48	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:08.335Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and Deputy Minister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.300Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and SMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:54.302-07
1099b86a-0245-45fd-84e6-8547eba09b35	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.300Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and SMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.561Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:54.562-07
e71fd8da-e38a-48cf-8205-27b8587385d4	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.561Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.660Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StaMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:54.662-07
dc3f6829-2b52-49d0-b5c1-078d8fb5879e	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.660Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StaMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.849Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StatMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:54.851-07
b6e73d11-ef30-4604-a895-8c7d6b87a0f5	\N	CREATE	Attachment	c24e64f3-ee10-4ed6-b40f-ec6668b87236	\N	{"file_name": "1777883521796-869562100_Untitled_design.png", "file_path": "uploads/attachments/1777883521796-869562100_Untitled_design.png", "created_at": "2026-05-04T08:32:01.802Z", "uploaded_by": null, "attachment_id": "c24e64f3-ee10-4ed6-b40f-ec6668b87236"}	2026-05-04 01:32:01.805-07
4cd96bd9-87dd-4590-9a1a-2f2910de2c84	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:56:02.416Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:56:06.969Z"}	2026-05-04 01:56:06.97-07
a69e6ee0-ea97-4fb6-bc9b-7d365d6ece0a	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:54.974Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StaMinister of Mines for the petroleum sector.e", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:57.178Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StaMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:58:57.179-07
287a39f0-3261-42c6-ae0d-c728efacdc82	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:58:57.178Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StaMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:59:00.374Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StatMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:59:00.376-07
a927108a-025f-455a-bccd-af6e1cb46f15	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:59:00.374Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StatMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:59:00.504Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StateMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:59:00.506-07
5bff0c01-0152-457d-93ec-e39cc416a9f5	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:59:00.504Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and StateMinister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:59:00.649Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 00:59:00.65-07
07c818c6-0ff7-4963-b7c4-9354bbcabe5b	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. Engineer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T07:51:48.274Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. Engineer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T08:01:52.291Z", "description": "H.E. Engineer Habtamu Tegegne is the Minister of Mines of Ethiopia.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 01:01:52.293-07
67a4f2f4-d8a6-4148-9fbc-0a3d0beda0bd	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	{"name": "HE. Engineer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T08:01:52.291Z", "description": "H.E. Engineer Habtamu Tegegne is the Minister of Mines of Ethiopia.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	{"name": "HE. Engineer Habtamu Tegegne", "level": 1, "title": "Minister of Mines", "header": "Minister of Mines", "is_active": true, "parent_id": null, "created_at": "2026-04-29T07:58:50.487Z", "deleted_at": null, "updated_at": "2026-05-04T08:02:55.841Z", "description": "H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.", "leadership_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2"}	2026-05-04 01:02:55.843-07
befc8795-7c40-45f6-9e6c-baf1a23775e4	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Birhanie Yadesa", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T07:55:26.099Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:33.922Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 01:04:33.924-07
7b54e9cf-1e93-4442-b2d7-eb21aef1b1d4	\N	CREATE	Attachment	35ae249b-e106-49d4-9829-8b18bca895db	\N	{"file_name": "1777884657356-77104070_asm.png", "file_path": "uploads/attachments/1777884657356-77104070_asm.png", "created_at": "2026-05-04T08:50:57.357Z", "uploaded_by": null, "attachment_id": "35ae249b-e106-49d4-9829-8b18bca895db"}	2026-05-04 01:50:57.385-07
533363ac-f4c5-41f0-be8a-468f372ba6ac	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:33.922Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Birhanie Yadesa HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:34.893Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 01:04:34.894-07
2c0503b5-dd30-4f6e-b1a9-779892ad4e45	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T07:59:00.649Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:40.772Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 01:04:40.773-07
3808c953-ea35-4196-879d-aeeb19ccd4f2	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:40.772Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:49.706Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. ", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 01:04:49.708-07
6083b4f8-4e01-4ae6-bfc1-2d4616344524	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:49.706Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. ", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:50.419Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 01:04:50.42-07
4b25b557-e807-47dc-8365-28c8c775402e	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:50.419Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:54.539Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 01:04:54.541-07
1c68d324-99ca-4fd2-8022-226a4e20386b	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Birhanie Yadesa HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:34.893Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Birhanie Yadesa HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:56.983Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. ", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 01:04:56.985-07
2f40bf58-6f88-4009-8c0d-c694447ac437	\N	CREATE	Attachment	73053c12-06cc-42f8-8d38-bda4036df6b4	\N	{"file_name": "1777881903729-899115261_4.png", "file_path": "uploads/attachments/1777881903729-899115261_4.png", "created_at": "2026-05-04T08:05:03.745Z", "uploaded_by": null, "attachment_id": "73053c12-06cc-42f8-8d38-bda4036df6b4"}	2026-05-04 01:05:03.748-07
334bd33c-7f6e-4e5c-a8e6-f42daf8b24e9	\N	DELETE	Attachment	8174a7d9-cafa-4bef-a257-5c9c9e38e7c8	{"file_name": "1777881379454-113371585_3.png", "file_path": "uploads/attachments/1777881379454-113371585_3.png", "created_at": "2026-05-04T07:56:19.469Z", "uploaded_by": null, "attachment_id": "8174a7d9-cafa-4bef-a257-5c9c9e38e7c8"}	\N	2026-05-04 01:05:03.835-07
b5bdc5e5-e41b-4ee3-8cae-54bddfb42af6	\N	CREATE	Attachment	c7d890ba-0b67-4b77-be32-533d7b98409d	\N	{"file_name": "1777881909469-765756976_3.png", "file_path": "uploads/attachments/1777881909469-765756976_3.png", "created_at": "2026-05-04T08:05:09.481Z", "uploaded_by": null, "attachment_id": "c7d890ba-0b67-4b77-be32-533d7b98409d"}	2026-05-04 01:05:09.484-07
95142be9-ab1f-4c2e-bfa4-7be67df48fdb	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Birhanie Yadesa HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:56.983Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. ", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:05:35.429Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. ", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 01:05:35.43-07
70b854cb-65e5-404d-bbb5-051349bf02bb	00000000-0000-4000-8000-000000000001	UPDATE	Partner	a37c20a1-d03a-4834-ab05-5fc92cf81322	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-04-29T08:17:28.855Z", "description": "International Partners in Ethiopia’s Mining Sector"}	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-05-04T08:10:09.803Z", "description": "Partners in Ethiopia’s Mining Sector"}	2026-05-04 01:10:09.804-07
faaa4238-1193-4904-b89a-9a72ad60efde	00000000-0000-4000-8000-000000000001	CREATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	\N	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:15:58.589Z"}	2026-05-04 01:15:58.591-07
21079169-7ca1-4033-9dfc-7737e12263dc	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:15:58.589Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:16:34.923Z"}	2026-05-04 01:16:34.925-07
c1dca0da-4f93-4ee8-9edf-65effcb7d09b	\N	CREATE	Attachment	a99b6519-eb79-4e77-a9a2-3e46c270b7d6	\N	{"file_name": "1777882798144-737435283_blank.pdf", "file_path": "uploads/attachments/1777882798144-737435283_blank.pdf", "created_at": "2026-05-04T08:19:58.146Z", "uploaded_by": null, "attachment_id": "a99b6519-eb79-4e77-a9a2-3e46c270b7d6"}	2026-05-04 01:19:58.17-07
d92fbadd-dbca-473f-8c3a-2ae4ff828a4c	\N	CREATE	Attachment	ee02e7f6-aa70-4441-8cf6-c643fa3e3a85	\N	{"file_name": "1777882841582-665989439_blank.pdf", "file_path": "uploads/attachments/1777882841582-665989439_blank.pdf", "created_at": "2026-05-04T08:20:41.584Z", "uploaded_by": null, "attachment_id": "ee02e7f6-aa70-4441-8cf6-c643fa3e3a85"}	2026-05-04 01:20:41.611-07
d5303d21-6d02-4f10-adae-2077a89517e7	\N	CREATE	Attachment	c127c2e6-1f9c-4ca1-b051-f69aee415773	\N	{"file_name": "1777882903433-9217381_blank.pdf", "file_path": "uploads/attachments/1777882903433-9217381_blank.pdf", "created_at": "2026-05-04T08:21:43.433Z", "uploaded_by": null, "attachment_id": "c127c2e6-1f9c-4ca1-b051-f69aee415773"}	2026-05-04 01:21:43.453-07
fefb08f5-d2b4-4607-8586-999ce6477b58	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:16:34.923Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:22:08.748Z"}	2026-05-04 01:22:08.75-07
42d15dfd-3ba2-4b5e-820c-3b0deb8e882e	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	5c58dca9-534d-48b2-8a22-1b5881d00775	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:04:54.539Z", "description": "H.E. Birhanie Yadesa is an Ethiopian leader focused on good governance, transparency, and sustainable development to promote economic growth and national prosperity.", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	{"name": "HE. Birhanie Yadesa ", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:58:08.335Z", "deleted_at": null, "updated_at": "2026-05-04T08:26:43.069Z", "description": "State Minister of  Mines Resource Development sector", "leadership_id": "5c58dca9-534d-48b2-8a22-1b5881d00775"}	2026-05-04 01:26:43.071-07
4dc040b6-3d8e-422e-83cd-9c5353bd61e9	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:05:35.429Z", "description": "H.E. Engineer Hana Birhanu is an Ethiopian leader and State Minister of Mines for the petroleum sector. ", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:27:17.952Z", "description": "State Minister of Petroleum and Geothermal resource development Sector", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 01:27:17.954-07
f889b52b-0c35-4ae1-9581-ea447529c0ba	00000000-0000-4000-8000-000000000001	UPDATE	Leadership	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	{"name": "HE. Engineer Hana Birhanu", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:27:17.952Z", "description": "State Minister of Petroleum and Geothermal resource development Sector", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	{"name": "HE. Engineer Hana Adnew", "level": 2, "title": "State Minister", "header": "Minister of Mines", "is_active": true, "parent_id": "df1bca3c-6a77-47f1-97e7-2092c0a2dae2", "created_at": "2026-05-04T07:54:28.356Z", "deleted_at": null, "updated_at": "2026-05-04T08:27:33.405Z", "description": "State Minister of Petroleum and Geothermal resource development Sector", "leadership_id": "e332ce28-e3f4-45f8-9fb3-7d03d75b2236"}	2026-05-04 01:27:33.406-07
05d15189-b624-42a4-bf5a-af7d827918c4	\N	CREATE	Attachment	a293e86e-5588-408f-9d86-19ff9b5b59f1	\N	{"file_name": "1777883490273-873417009_Untitled_design__2_-removebg-preview.png", "file_path": "uploads/attachments/1777883490273-873417009_Untitled_design__2_-removebg-preview.png", "created_at": "2026-05-04T08:31:30.277Z", "uploaded_by": null, "attachment_id": "a293e86e-5588-408f-9d86-19ff9b5b59f1"}	2026-05-04 01:31:30.284-07
caa0c3eb-3ffd-4956-9abb-35186f6f4706	\N	CREATE	Attachment	b11e85c1-3f80-467a-b2dc-706420e46820	\N	{"file_name": "1777883503274-50550617_7.png", "file_path": "uploads/attachments/1777883503274-50550617_7.png", "created_at": "2026-05-04T08:31:43.277Z", "uploaded_by": null, "attachment_id": "b11e85c1-3f80-467a-b2dc-706420e46820"}	2026-05-04 01:31:43.3-07
a198352f-0083-40a7-bf01-0d81a44ec7e0	00000000-0000-4000-8000-000000000001	UPDATE	Partner	a37c20a1-d03a-4834-ab05-5fc92cf81322	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-05-04T08:10:09.803Z", "description": "Partners in Ethiopia’s Mining Sector"}	{"title": "Our Partners", "created_at": "2026-04-29T05:58:22.473Z", "deleted_at": null, "partner_id": "a37c20a1-d03a-4834-ab05-5fc92cf81322", "updated_at": "2026-05-04T08:32:11.504Z", "description": "Partners in Ethiopia’s Mining Sector"}	2026-05-04 01:32:11.506-07
47f5b3cd-5b9d-4ace-98ed-d50b906eb440	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:22:08.748Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:37:43.068Z"}	2026-05-04 01:37:43.069-07
3ef6cb0f-675d-47f1-89e3-dcf374180df7	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:37:43.068Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:37:47.840Z"}	2026-05-04 01:37:47.841-07
66aec2c3-eda8-4265-9206-5a913708bdc3	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:37:47.840Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:38:48.282Z"}	2026-05-04 01:38:48.284-07
2f489249-bd4a-4fe8-8b61-6e1f72768678	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:38:48.282Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:39:39.989Z"}	2026-05-04 01:39:39.991-07
395fc878-8192-46b0-a3cc-486c1216f640	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:39:39.989Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:40:26.333Z"}	2026-05-04 01:40:26.335-07
bfedcf27-bd70-4cad-9ef4-3104325a075a	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:40:26.333Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:41:01.691Z"}	2026-05-04 01:41:01.692-07
60ce5a6d-dc02-476c-8c9c-63277379eb02	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:41:01.691Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:41:51.869Z"}	2026-05-04 01:41:51.87-07
a11428b3-1ff8-439d-be40-fa8aaf064f50	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:41:51.869Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:43:27.652Z"}	2026-05-04 01:43:27.654-07
385500d2-bff4-4e33-ab6e-dc16fa9ce782	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:43:27.652Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:44:12.272Z"}	2026-05-04 01:44:12.273-07
864c90cf-ebfe-46ca-bf1e-84a28d02b44b	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:44:12.272Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:45:00.928Z"}	2026-05-04 01:45:00.929-07
25ae9a19-1c68-4c1b-beae-136f8db9b34b	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-04-29T08:08:12.910Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-04T08:45:27.162Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-05-04 01:45:27.163-07
a873303c-fed3-4d43-b916-7092a551e1c6	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-04T08:45:27.162Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-04T08:46:51.985Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-05-04 01:46:51.986-07
8942111d-9d46-4100-8cd6-e8b21137db26	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:45:00.928Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:47:22.958Z"}	2026-05-04 01:47:22.959-07
34206885-87a4-437b-94fe-c982c99e43e2	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:47:22.958Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:48:15.770Z"}	2026-05-04 01:48:15.772-07
ffad7ffb-c6ec-4f13-bfd4-1ab9cb8b3aff	\N	CREATE	Attachment	5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3	\N	{"file_name": "1777884514599-530251790_logo-only.png", "file_path": "uploads/attachments/1777884514599-530251790_logo-only.png", "created_at": "2026-05-04T08:48:34.604Z", "uploaded_by": null, "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	2026-05-04 01:48:34.636-07
8e89150d-ec0a-49d1-a42a-a7a603003169	00000000-0000-4000-8000-000000000001	CREATE	FooterSection	e298e988-324a-4052-862c-1f8c8e8519dc	\N	{"links": [{"url": "https://www.mom.gov.et/en/mining", "label": "Mining Sector"}, {"url": "https://www.mom.gov.et/en/services", "label": "Services"}, {"url": "https://www.mom.gov.et/en/news", "label": "News & Updates"}], "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.246Z", "updated_at": "2026-05-04T08:51:30.246Z", "section_name": "Quick Links", "footer_section_id": "e298e988-324a-4052-862c-1f8c8e8519dc"}	2026-05-04 01:51:30.249-07
8a0a82b9-cc3a-454e-b772-e2e42073cb44	00000000-0000-4000-8000-000000000001	CREATE	FooterSection	1bbdbf1f-84a7-4697-b7fa-98affbfe4f8a	\N	{"links": [], "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.250Z", "updated_at": "2026-05-04T08:51:30.250Z", "section_name": "Section 2", "footer_section_id": "1bbdbf1f-84a7-4697-b7fa-98affbfe4f8a"}	2026-05-04 01:51:30.251-07
7d5e9762-84af-48da-b11a-6b3a84fbc1ac	00000000-0000-4000-8000-000000000001	CREATE	FooterSection	70038460-f362-4694-94e0-fe27c6cd3f0b	\N	{"links": [], "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.252Z", "updated_at": "2026-05-04T08:51:30.252Z", "section_name": "Section 3", "footer_section_id": "70038460-f362-4694-94e0-fe27c6cd3f0b"}	2026-05-04 01:51:30.252-07
f4189830-eb0e-4f57-bfb0-36e4a08ab766	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:51:00.042Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:51:43.661Z"}	2026-05-04 01:51:43.662-07
50fca4b9-9a97-4d5c-bc59-e9a542d472a5	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:51:43.661Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:53:17.003Z"}	2026-05-04 01:53:17.004-07
fa055130-4fb3-4905-ab09-2c20273704fc	\N	DELETE	Attachment	35ae249b-e106-49d4-9829-8b18bca895db	{"file_name": "1777884657356-77104070_asm.png", "file_path": "uploads/attachments/1777884657356-77104070_asm.png", "created_at": "2026-05-04T08:50:57.357Z", "uploaded_by": null, "attachment_id": "35ae249b-e106-49d4-9829-8b18bca895db"}	\N	2026-05-04 01:53:33.153-07
d118798e-56ba-45ab-bbac-161d93fe335e	\N	CREATE	Attachment	1ddf2cee-422d-44f9-82e7-4b627657155e	\N	{"file_name": "1777884820606-793044517_asm.png", "file_path": "uploads/attachments/1777884820606-793044517_asm.png", "created_at": "2026-05-04T08:53:40.608Z", "uploaded_by": null, "attachment_id": "1ddf2cee-422d-44f9-82e7-4b627657155e"}	2026-05-04 01:53:40.612-07
87641319-f3f6-4d73-8513-9992858c5e3b	\N	DELETE	Attachment	1ddf2cee-422d-44f9-82e7-4b627657155e	{"file_name": "1777884820606-793044517_asm.png", "file_path": "uploads/attachments/1777884820606-793044517_asm.png", "created_at": "2026-05-04T08:53:40.608Z", "uploaded_by": null, "attachment_id": "1ddf2cee-422d-44f9-82e7-4b627657155e"}	\N	2026-05-04 01:53:59.728-07
f887f459-226b-404a-b480-46c6ae608c5e	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:53:17.003Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:54:08.065Z"}	2026-05-04 01:54:08.066-07
3254a52e-eab9-4489-a351-e679ff232cdc	\N	CREATE	Attachment	53cb4a79-bbdd-44bd-92cf-00db104db810	\N	{"file_name": "1777884861045-936106106_asm.png", "file_path": "uploads/attachments/1777884861045-936106106_asm.png", "created_at": "2026-05-04T08:54:21.047Z", "uploaded_by": null, "attachment_id": "53cb4a79-bbdd-44bd-92cf-00db104db810"}	2026-05-04 01:54:21.054-07
10eeb844-e1b6-470a-84e9-52688c87e3b1	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:54:08.065Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:54:40.656Z"}	2026-05-04 01:54:40.658-07
5802e954-7e02-42f8-8e79-761713ece8c2	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:54:40.656Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:55:06.275Z"}	2026-05-04 01:55:06.276-07
8fdafc1a-61c1-457f-b235-8d6e7b6aaa81	\N	CREATE	Attachment	a7ef2d57-76a3-4caf-a22e-074ee83138d2	\N	{"file_name": "1777884919845-178176798_blank.pdf", "file_path": "uploads/attachments/1777884919845-178176798_blank.pdf", "created_at": "2026-05-04T08:55:19.847Z", "uploaded_by": null, "attachment_id": "a7ef2d57-76a3-4caf-a22e-074ee83138d2"}	2026-05-04 01:55:19.854-07
4afde71d-dc6a-47a6-b168-53b2721cef73	\N	DELETE	Attachment	a7ef2d57-76a3-4caf-a22e-074ee83138d2	{"file_name": "1777884919845-178176798_blank.pdf", "file_path": "uploads/attachments/1777884919845-178176798_blank.pdf", "created_at": "2026-05-04T08:55:19.847Z", "uploaded_by": null, "attachment_id": "a7ef2d57-76a3-4caf-a22e-074ee83138d2"}	\N	2026-05-04 01:55:21.469-07
7105f62d-1ebb-41bf-b92f-009bc07d4c21	\N	CREATE	Attachment	9698a59c-f1bb-4496-b521-b52ba3b12482	\N	{"file_name": "1777884925392-23065763_asm.png", "file_path": "uploads/attachments/1777884925392-23065763_asm.png", "created_at": "2026-05-04T08:55:25.394Z", "uploaded_by": null, "attachment_id": "9698a59c-f1bb-4496-b521-b52ba3b12482"}	2026-05-04 01:55:25.398-07
fe8b703f-2450-4b4a-81bf-f8dcc5a48649	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:55:06.275Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:55:27.984Z"}	2026-05-04 01:55:27.985-07
27af3946-e111-4f44-a29e-777e2950c928	00000000-0000-4000-8000-000000000001	UPDATE	Footer	4099dfcc-841b-4666-9b62-5b2e076d06db	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T08:51:30.239Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T08:55:51.320Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	2026-05-04 01:55:51.322-07
d87e6141-8c0d-4dc5-a609-fed76aa2fe0a	\N	DELETE	Attachment	9698a59c-f1bb-4496-b521-b52ba3b12482	{"file_name": "1777884925392-23065763_asm.png", "file_path": "uploads/attachments/1777884925392-23065763_asm.png", "created_at": "2026-05-04T08:55:25.394Z", "uploaded_by": null, "attachment_id": "9698a59c-f1bb-4496-b521-b52ba3b12482"}	\N	2026-05-04 01:55:57.993-07
0cd69490-ddcb-4f0d-a1f5-1739b31bbff0	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:56:06.969Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:56:40.989Z"}	2026-05-04 01:56:40.99-07
c240a2e1-5da2-4c09-af68-04cb2654aebd	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:56:40.989Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:57:03.626Z"}	2026-05-04 01:57:03.629-07
a9a2fc21-60b4-4a5f-bbfa-aaf1906c91e3	\N	CREATE	Attachment	ddd749de-5610-498d-a349-61c33a9bfed9	\N	{"file_name": "1777885039996-35634098_asm.png", "file_path": "uploads/attachments/1777885039996-35634098_asm.png", "created_at": "2026-05-04T08:57:19.998Z", "uploaded_by": null, "attachment_id": "ddd749de-5610-498d-a349-61c33a9bfed9"}	2026-05-04 01:57:20.003-07
14fbeba8-b61d-4456-901e-3d8677de6984	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:57:03.626Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:57:21.732Z"}	2026-05-04 01:57:21.733-07
74476a79-d630-4acf-a90b-47119f15c9d3	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:57:21.732Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:58:26.419Z"}	2026-05-04 01:58:26.42-07
3131cca0-962b-48ec-b906-89092d0c32fd	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:58:26.419Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:58:47.044Z"}	2026-05-04 01:58:47.045-07
29f74cbf-a44f-441c-bba3-63b37e4bb11b	\N	CREATE	Attachment	b36de25f-97ce-4dbe-b519-2eaa95841380	\N	{"file_name": "1777885185377-528180847_asm.png", "file_path": "uploads/attachments/1777885185377-528180847_asm.png", "created_at": "2026-05-04T08:59:45.380Z", "uploaded_by": null, "attachment_id": "b36de25f-97ce-4dbe-b519-2eaa95841380"}	2026-05-04 01:59:45.403-07
39d5ab6e-4d74-4ce0-99c0-3a083251ef62	\N	DELETE	Attachment	ddd749de-5610-498d-a349-61c33a9bfed9	{"file_name": "1777885039996-35634098_asm.png", "file_path": "uploads/attachments/1777885039996-35634098_asm.png", "created_at": "2026-05-04T08:57:19.998Z", "uploaded_by": null, "attachment_id": "ddd749de-5610-498d-a349-61c33a9bfed9"}	\N	2026-05-04 01:59:46.978-07
a01aa248-ea35-4994-bab1-7070e368d86d	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:58:47.044Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:59:51.791Z"}	2026-05-04 01:59:51.792-07
e243458b-c18d-429e-8119-ce614dc7ed19	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:59:51.791Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:59:53.750Z"}	2026-05-04 01:59:53.751-07
cbd2ebd7-1500-4a2a-97ec-e8b8d083ade7	00000000-0000-4000-8000-000000000001	UPDATE	ASM	9a531821-f822-4f20-a51f-2cf42f92a50b	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T08:59:53.750Z"}	{"asm_id": "9a531821-f822-4f20-a51f-2cf42f92a50b", "created_at": "2026-05-04T08:15:58.589Z", "deleted_at": null, "updated_at": "2026-05-04T09:02:41.253Z"}	2026-05-04 02:02:41.255-07
20462422-99fc-4075-8e0b-068fa9469fe4	00000000-0000-4000-8000-000000000001	CREATE	SocialMedia	4aaa9f6b-95f8-494f-b97b-58af4941a870	\N	{"url": "https://www.facebook.com/MinesandPetroleum/", "icon": "Facebook", "created_at": "2026-05-04T09:04:47.607Z", "deleted_at": null, "updated_at": "2026-05-04T09:04:47.607Z", "platform_name": "Facebook", "social_media_id": "4aaa9f6b-95f8-494f-b97b-58af4941a870"}	2026-05-04 02:04:47.613-07
4036ab90-002b-4d1e-8284-0029f28626ed	00000000-0000-4000-8000-000000000001	CREATE	SocialMedia	198441eb-aef4-4980-b765-594fee03f373	\N	{"url": "https://www.linkedin.com/company/ministry-of-mines-ethiopia/", "icon": "Linkedin", "created_at": "2026-05-04T09:04:51.833Z", "deleted_at": null, "updated_at": "2026-05-04T09:04:51.833Z", "platform_name": "Linkedin", "social_media_id": "198441eb-aef4-4980-b765-594fee03f373"}	2026-05-04 02:04:51.836-07
f3e3e07f-0d48-4cd3-b7b9-b747acead57a	00000000-0000-4000-8000-000000000001	CREATE	SocialMedia	cdb614c9-de34-46fb-b164-2dd2d749a564	\N	{"url": "https://x.com/MinistryofMine_", "icon": "LucideTwitter", "created_at": "2026-05-04T09:04:57.621Z", "deleted_at": null, "updated_at": "2026-05-04T09:04:57.621Z", "platform_name": "Twitter", "social_media_id": "cdb614c9-de34-46fb-b164-2dd2d749a564"}	2026-05-04 02:04:57.623-07
0e2991f0-1a67-41eb-a7b8-5d3cc14b8c53	00000000-0000-4000-8000-000000000001	CREATE	SocialMedia	cb63ef14-622b-48f8-bc70-d83012d66053	\N	{"url": "https://t.me/momEthi", "icon": "LucideSend", "created_at": "2026-05-04T09:07:53.711Z", "deleted_at": null, "updated_at": "2026-05-04T09:07:53.711Z", "platform_name": "Telegram", "social_media_id": "cb63ef14-622b-48f8-bc70-d83012d66053"}	2026-05-04 02:07:53.715-07
41c3835b-0d2a-4c27-a047-47f9cf34c30c	00000000-0000-4000-8000-000000000001	UPDATE	Footer	4099dfcc-841b-4666-9b62-5b2e076d06db	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T08:55:51.320Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T09:09:11.319Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	2026-05-04 02:09:11.32-07
8a3f9868-db0a-4095-94a8-7e6c713a6d46	00000000-0000-4000-8000-000000000001	UPDATE	Footer	4099dfcc-841b-4666-9b62-5b2e076d06db	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T09:09:11.319Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	{"text": "© 2026 Ministry of Mines – Ethiopia. All rights reserved.", "title": "Ministry of Mines", "content": null, "footer_id": "4099dfcc-841b-4666-9b62-5b2e076d06db", "created_at": "2026-05-04T08:51:30.239Z", "updated_at": "2026-05-04T09:09:13.903Z", "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3"}	2026-05-04 02:09:13.904-07
2c32de65-e355-4b13-bcaa-d1c07d56251a	\N	CREATE	Attachment	3a4411a9-987b-4d7a-a0a8-0edbc9a2413f	\N	{"file_name": "1777886019894-857160170_unsdg.png", "file_path": "uploads/attachments/1777886019894-857160170_unsdg.png", "created_at": "2026-05-04T09:13:39.902Z", "uploaded_by": null, "attachment_id": "3a4411a9-987b-4d7a-a0a8-0edbc9a2413f"}	2026-05-04 02:13:39.921-07
11932904-5f92-4ddc-a9c9-65bcf2d20e98	\N	CREATE	Attachment	0322a67e-278b-4f25-a8e2-5011df89ee7c	\N	{"file_name": "1777886077458-39254568_agenda.png", "file_path": "uploads/attachments/1777886077458-39254568_agenda.png", "created_at": "2026-05-04T09:14:37.464Z", "uploaded_by": null, "attachment_id": "0322a67e-278b-4f25-a8e2-5011df89ee7c"}	2026-05-04 02:14:37.497-07
20c83ba9-c632-49ae-9ceb-84daf8459e8a	\N	CREATE	Attachment	5cb418a7-eb11-42a3-9bc7-b2512a5c4518	\N	{"file_name": "1777886101941-651639821_comesa.png", "file_path": "uploads/attachments/1777886101941-651639821_comesa.png", "created_at": "2026-05-04T09:15:01.944Z", "uploaded_by": null, "attachment_id": "5cb418a7-eb11-42a3-9bc7-b2512a5c4518"}	2026-05-04 02:15:01.949-07
1bd6e519-81ba-45ea-8310-9c4937d19f49	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:13:43.598Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:15:02.656Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:15:02.657-07
ef9d1835-fb20-4e99-8090-25d3f62722a8	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:15:02.656Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:20:40.290Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:20:40.292-07
bfc2c2f2-82f1-4bbe-a53e-46d7d4cdf3af	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:20:40.290Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:21:55.894Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:21:55.895-07
ba2ef49e-a1a3-47ca-bf11-9c2ad8094509	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:21:55.894Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:22:32.329Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:22:32.331-07
d6d08d9b-a88a-4298-ac26-3cac4dcac0c6	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:22:32.329Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:24:43.501Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:24:43.503-07
d89daf10-62b3-41de-a393-f6e086bb32fa	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:24:43.501Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:24:50.910Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:24:50.911-07
f36947ce-40e4-4bab-a677-18849b3176cf	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:24:50.910Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:26:16.331Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:26:16.332-07
0e0cd94e-7bd4-4a55-b46c-9ae275ef0569	00000000-0000-4000-8000-000000000001	UPDATE	InvestigateEthiopia	aa8efc7e-7035-4dbc-a272-8d3866e0b652	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:26:16.331Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	{"created_at": "2026-05-04T09:13:43.598Z", "deleted_at": null, "updated_at": "2026-05-04T09:28:02.555Z", "investigate_ethiopia_id": "aa8efc7e-7035-4dbc-a272-8d3866e0b652"}	2026-05-04 02:28:02.558-07
8d94efbf-fa73-4043-9da6-379a305ef596	00000000-0000-4000-8000-000000000001	CREATE	Service	5de2bb9f-1744-4f3e-b2da-64c6ba97f4d7	\N	{"icon": "FileCheck", "title": "Mining License Issuance", "content": "Grants exploration, mining, and artisanal licenses in compliance with national regulations.", "created_at": "2026-05-04T12:22:54.562Z", "service_id": "5de2bb9f-1744-4f3e-b2da-64c6ba97f4d7"}	2026-05-04 05:22:54.565-07
d2d938e7-133e-4281-8b08-9a4e368d2c2a	00000000-0000-4000-8000-000000000001	CREATE	Service	4ab3ec6d-60e6-4364-bb8f-7c9197896a8d	\N	{"icon": "MapPinHouse", "title": "Geological Survey & Data Services", "content": "Provides geoscience data, mineral mapping, and exploration insights to support investment and research.", "created_at": "2026-05-04T12:23:33.110Z", "service_id": "4ab3ec6d-60e6-4364-bb8f-7c9197896a8d"}	2026-05-04 05:23:33.111-07
44822fdb-c1ac-4884-9cda-5ca3734997a1	00000000-0000-4000-8000-000000000001	CREATE	Service	10f25296-8f9d-4bdc-8706-f7abc310b377	\N	{"icon": "LucideDatabaseZap", "title": "Mining Cadastre Management", "content": "Manages digital mining rights, licenses, and land use through a transparent cadastre system.", "created_at": "2026-05-04T12:24:08.220Z", "service_id": "10f25296-8f9d-4bdc-8706-f7abc310b377"}	2026-05-04 05:24:08.224-07
ff6dc743-0651-4600-a8a6-0c9fdbe7b2ae	00000000-0000-4000-8000-000000000001	CREATE	Service	074940c7-c536-4eaf-8f69-d1ad6da7eb2d	\N	{"icon": "BriefcaseBusinessIcon", "title": "Investment Facilitation", "content": "Supports local and international investors with guidance, approvals, and sector opportunities.", "created_at": "2026-05-04T12:24:44.316Z", "service_id": "074940c7-c536-4eaf-8f69-d1ad6da7eb2d"}	2026-05-04 05:24:44.318-07
9a537158-cf11-4fc1-88dc-0e68feeef2db	00000000-0000-4000-8000-000000000001	CREATE	Service	276bfd83-09b6-44fb-b16a-8ba2e1e06d0c	\N	{"icon": "Scale", "title": "Regulation & Compliance Monitoring", "content": "Ensures mining activities follow legal, safety, and environmental standards.", "created_at": "2026-05-04T12:25:32.919Z", "service_id": "276bfd83-09b6-44fb-b16a-8ba2e1e06d0c"}	2026-05-04 05:25:32.924-07
bc188e5a-54b7-42e1-875d-d011194bf809	00000000-0000-4000-8000-000000000001	CREATE	Service	929b95dd-0d62-43cd-b78a-9e60ccafab73	\N	{"icon": "LucideLeaf", "title": "Environmental & Social Oversight", "content": "Promotes sustainable mining practices and monitors environmental and community impacts.", "created_at": "2026-05-04T12:25:56.405Z", "service_id": "929b95dd-0d62-43cd-b78a-9e60ccafab73"}	2026-05-04 05:25:56.406-07
5c55645f-bcb8-46d7-8a8d-fa18a78d949e	00000000-0000-4000-8000-000000000001	CREATE	Service	c015d99c-41f1-47f5-b6ea-e5282d37c22d	\N	{"icon": "LucideFactory", "title": "Mineral Value Addition Support", "content": "Encourages processing, refining, and local value addition to increase economic returns.", "created_at": "2026-05-04T12:26:21.103Z", "service_id": "c015d99c-41f1-47f5-b6ea-e5282d37c22d"}	2026-05-04 05:26:21.105-07
02b3db45-7ac2-4794-b607-fdb6405fd100	00000000-0000-4000-8000-000000000001	CREATE	Service	6848ce4c-489d-496d-97e6-72d4dd88fb7a	\N	{"icon": "LucideUsers", "title": "Artisanal Mining Support", "content": "Assists small-scale miners with formalization, training, and access to resources.", "created_at": "2026-05-04T12:26:37.889Z", "service_id": "6848ce4c-489d-496d-97e6-72d4dd88fb7a"}	2026-05-04 05:26:37.891-07
5d281831-663d-49c8-a181-2a8fd2d70ee7	\N	CREATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	\N	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:45:36.386Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 10}	2026-05-05 23:45:36.411-07
bb41de5c-c741-453a-9eef-180c1b3e496d	00000000-0000-4000-8000-000000000001	CREATE	Service	adfbc53c-d189-4384-ad87-d9d4260a8b77	\N	{"icon": "LucideBookOpenCheck", "title": "Policy Development & Reform", "content": "Develops policies and strategies to modernize and strengthen the mining sector.", "created_at": "2026-05-04T12:27:02.176Z", "service_id": "adfbc53c-d189-4384-ad87-d9d4260a8b77"}	2026-05-04 05:27:02.178-07
5309e7e4-6909-4f11-8bb5-55e906a268ba	00000000-0000-4000-8000-000000000001	CREATE	Service	a55c59de-5359-4e28-85e1-e59753429155	\N	{"icon": "FlaskConicalIcon", "title": "Laboratory & Testing Services", "content": "Provides mineral testing, quality analysis, and certification services.", "created_at": "2026-05-04T12:27:37.890Z", "service_id": "a55c59de-5359-4e28-85e1-e59753429155"}	2026-05-04 05:27:37.892-07
7ed7cb87-d002-4f40-8638-9caebb293811	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-04T08:46:51.985Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-04T18:57:54.846Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-05-04 11:57:54.848-07
023571f6-9b62-469e-96b2-56fd41d21759	00000000-0000-4000-8000-000000000001	UPDATE	Route	7bb762f7-a51f-45fe-b4b3-ac17693a3d13	{"path": "/geothermal", "order": 2, "route_id": "7bb762f7-a51f-45fe-b4b3-ac17693a3d13", "is_active": true, "parent_id": "3c8a6620-af06-4e8c-97bc-9927b5f66727", "created_at": "2026-04-28T13:48:34.854Z", "updated_at": "2026-04-28T13:48:34.854Z", "show_in_navbar": true}	{"path": "/geothermal", "order": 2, "route_id": "7bb762f7-a51f-45fe-b4b3-ac17693a3d13", "is_active": false, "parent_id": "3c8a6620-af06-4e8c-97bc-9927b5f66727", "created_at": "2026-04-28T13:48:34.854Z", "updated_at": "2026-05-04T19:07:53.781Z", "show_in_navbar": true}	2026-05-04 12:07:53.783-07
5491ed8b-6659-4726-9de9-6e9a4a9ffcb3	00000000-0000-4000-8000-000000000001	UPDATE	Route	7bb762f7-a51f-45fe-b4b3-ac17693a3d13	{"path": "/geothermal", "order": 2, "route_id": "7bb762f7-a51f-45fe-b4b3-ac17693a3d13", "is_active": false, "parent_id": "3c8a6620-af06-4e8c-97bc-9927b5f66727", "created_at": "2026-04-28T13:48:34.854Z", "updated_at": "2026-05-04T19:07:53.781Z", "show_in_navbar": true}	{"path": "/geothermal", "order": 2, "route_id": "7bb762f7-a51f-45fe-b4b3-ac17693a3d13", "is_active": true, "parent_id": "3c8a6620-af06-4e8c-97bc-9927b5f66727", "created_at": "2026-04-28T13:48:34.854Z", "updated_at": "2026-05-04T19:08:42.519Z", "show_in_navbar": true}	2026-05-04 12:08:42.52-07
d27dea11-3c27-43cc-a108-1c803996c75a	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-04T18:57:54.846Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-05T10:55:19.052Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-05-05 03:55:19.054-07
f2eb227c-c2ae-4467-a504-d14a3709f193	00000000-0000-4000-8000-000000000001	CREATE	Tag	48927f9e-e3ea-4e6f-a6af-ac49fe231143	\N	{"name": "Community", "tag_id": "48927f9e-e3ea-4e6f-a6af-ac49fe231143", "created_at": "2026-05-06T06:39:18.030Z"}	2026-05-05 23:39:18.033-07
29d0390b-6783-4bbb-8ce9-26fc143cc880	\N	CREATE	Attachment	2f361f67-0df0-48cb-9abd-ccb0d1d2c112	\N	{"file_name": "1778049679245-65150776_photo_2026-05-06_09-39-45.jpg", "file_path": "uploads/attachments/1778049679245-65150776_photo_2026-05-06_09-39-45.jpg", "created_at": "2026-05-06T06:41:19.248Z", "uploaded_by": null, "attachment_id": "2f361f67-0df0-48cb-9abd-ccb0d1d2c112"}	2026-05-05 23:41:19.271-07
3ba4387a-140a-4400-a56f-1ac33f7cccee	\N	CREATE	Attachment	aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9	\N	{"file_name": "1778049679275-131017428_photo_2026-05-06_09-40-12.jpg", "file_path": "uploads/attachments/1778049679275-131017428_photo_2026-05-06_09-40-12.jpg", "created_at": "2026-05-06T06:41:19.278Z", "uploaded_by": null, "attachment_id": "aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9"}	2026-05-05 23:41:19.279-07
06067669-7fcd-4e66-b13e-73642944706c	\N	CREATE	Attachment	b1f0f275-2d70-40be-8058-bf042e0dce71	\N	{"file_name": "1778049679308-443159849_photo_2026-05-06_09-40-17.jpg", "file_path": "uploads/attachments/1778049679308-443159849_photo_2026-05-06_09-40-17.jpg", "created_at": "2026-05-06T06:41:19.311Z", "uploaded_by": null, "attachment_id": "b1f0f275-2d70-40be-8058-bf042e0dce71"}	2026-05-05 23:41:19.315-07
cf498e0c-46bb-4289-8aaf-d01b5d1854ce	\N	CREATE	Attachment	0c5d4592-4f0d-4d39-89d4-df1191b7a686	\N	{"file_name": "1778049679348-418782620_photo_2026-05-06_09-40-27.jpg", "file_path": "uploads/attachments/1778049679348-418782620_photo_2026-05-06_09-40-27.jpg", "created_at": "2026-05-06T06:41:19.352Z", "uploaded_by": null, "attachment_id": "0c5d4592-4f0d-4d39-89d4-df1191b7a686"}	2026-05-05 23:41:19.356-07
e624a9e3-e31d-4a19-a2d4-951d94a3af16	\N	CREATE	Attachment	da265c30-bbba-4295-9210-4178647a231b	\N	{"file_name": "1778049679350-286971131_photo_2026-05-06_09-40-21.jpg", "file_path": "uploads/attachments/1778049679350-286971131_photo_2026-05-06_09-40-21.jpg", "created_at": "2026-05-06T06:41:19.353Z", "uploaded_by": null, "attachment_id": "da265c30-bbba-4295-9210-4178647a231b"}	2026-05-05 23:41:19.359-07
ceb6d01f-122f-42ed-a7fc-2ad8db8a487b	00000000-0000-4000-8000-000000000001	CREATE	News	c9f69b86-b02f-4e0a-9c42-9520683613aa	\N	{"title": "Support Provided to Muslim Employees on the Occasion of Eid al-Fitr", "author": "Minstry of Mines", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;10,&nbsp;2018&nbsp;E.C.)</em></strong>&nbsp;Financial&nbsp;and&nbsp;material&nbsp;support&nbsp;was&nbsp;extended&nbsp;to&nbsp;Muslim&nbsp;employees&nbsp;of&nbsp;the&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;the&nbsp;Ethiopian&nbsp;Geological&nbsp;Institute,&nbsp;and&nbsp;the&nbsp;Mining&nbsp;Industry&nbsp;Development&nbsp;Institute&nbsp;in&nbsp;celebration&nbsp;of&nbsp;Eid&nbsp;al-Fitr.</p><p></p><p>This&nbsp;initiative&nbsp;was&nbsp;organized&nbsp;not&nbsp;only&nbsp;to&nbsp;assist&nbsp;employees&nbsp;during&nbsp;the&nbsp;holiday&nbsp;but&nbsp;also&nbsp;to&nbsp;express&nbsp;appreciation,&nbsp;solidarity,&nbsp;and&nbsp;recognition&nbsp;of&nbsp;their&nbsp;contributions&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;It&nbsp;reflects&nbsp;the&nbsp;institutions’&nbsp;commitment&nbsp;to&nbsp;fostering&nbsp;an&nbsp;inclusive&nbsp;and&nbsp;supportive&nbsp;workplace&nbsp;culture&nbsp;that&nbsp;respects&nbsp;religious&nbsp;and&nbsp;cultural&nbsp;values.&nbsp;By&nbsp;marking&nbsp;this&nbsp;important&nbsp;occasion,&nbsp;the&nbsp;Ministry&nbsp;and&nbsp;its&nbsp;affiliated&nbsp;institutions&nbsp;aim&nbsp;to&nbsp;strengthen&nbsp;unity,&nbsp;morale,&nbsp;and&nbsp;a&nbsp;sense&nbsp;of&nbsp;community&nbsp;among&nbsp;employees.</p><p></p><p>The&nbsp;support&nbsp;also&nbsp;served&nbsp;as&nbsp;a&nbsp;gesture&nbsp;of&nbsp;goodwill,&nbsp;conveying&nbsp;warm&nbsp;Eid&nbsp;greetings&nbsp;and&nbsp;best&nbsp;wishes&nbsp;to&nbsp;Muslim&nbsp;staff&nbsp;across&nbsp;the&nbsp;sector.</p><p></p><p></p><p><strong>Twitter:</strong>&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</p><p><strong>Website:</strong>&nbsp;<a href=\\"http://www.mom.gov.et\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">www.mom.gov.et</a></p><p><strong>Facebook:&nbsp;</strong><a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p><strong>Telegram:</strong>&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p><p><strong>Email:</strong>&nbsp;info@mom.gov.et</p>", "news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "created_at": "2026-05-06T06:44:54.851Z", "deleted_at": null, "updated_at": "2026-05-06T06:44:54.851Z", "published_at": "2026-03-19T03:39:00.000Z"}	2026-05-05 23:44:54.853-07
fc75af11-c675-4c35-b720-87eb42342d59	00000000-0000-4000-8000-000000000001	CREATE	NewsMetadata	b27d1dea-14d9-4104-bab4-77d40a8759c9	\N	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "created_at": "2026-05-06T06:44:54.862Z", "like_count": 0, "read_count": 0, "updated_at": "2026-05-06T06:44:54.862Z", "dislike_count": 0, "news_metadata_id": "b27d1dea-14d9-4104-bab4-77d40a8759c9", "average_read_time": 0}	2026-05-05 23:44:54.864-07
07a3fd1b-d3f3-4343-989c-587430a93948	00000000-0000-4000-8000-000000000001	CREATE	NewsReaction	aaf83405-2a3f-4aac-9118-016abe356da9	\N	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "reaction": "like", "created_at": "2026-05-06T06:45:57.881Z", "ip_address": "::ffff:172.18.0.6", "news_reaction_id": "aaf83405-2a3f-4aac-9118-016abe356da9"}	2026-05-05 23:45:57.883-07
13be2129-2527-48f3-985f-d890003c647e	\N	CREATE	Attachment	ec5d35bf-3484-4c20-961b-b4d391f7586c	\N	{"file_name": "1778050010589-574080062_photo_2026-05-06_09-46-20.jpg", "file_path": "uploads/attachments/1778050010589-574080062_photo_2026-05-06_09-46-20.jpg", "created_at": "2026-05-06T06:46:50.591Z", "uploaded_by": null, "attachment_id": "ec5d35bf-3484-4c20-961b-b4d391f7586c"}	2026-05-05 23:46:50.595-07
d92d5bec-85aa-41a9-9836-fe66d6cd3acb	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:45:36.386Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 10}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:47:18.162Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 20}	2026-05-05 23:47:18.165-07
ea6beecf-8c6b-481c-a737-3a730d031481	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:47:18.162Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 20}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:47:31.225Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 30}	2026-05-05 23:47:31.228-07
0f769f49-04a3-4405-98ad-3cbba567fb4b	\N	CREATE	Attachment	2f32c542-dbd8-44a8-b273-487c4b0dfd94	\N	{"file_name": "1778050091681-374796025_photo_2026-05-06_09-46-20.jpg", "file_path": "uploads/attachments/1778050091681-374796025_photo_2026-05-06_09-46-20.jpg", "created_at": "2026-05-06T06:48:11.684Z", "uploaded_by": null, "attachment_id": "2f32c542-dbd8-44a8-b273-487c4b0dfd94"}	2026-05-05 23:48:11.687-07
e20c9a32-5693-49fa-bd7a-b71da151c5cb	00000000-0000-4000-8000-000000000001	CREATE	Tag	265ec3a0-5c35-44f8-8f70-75802937a4a5	\N	{"name": "MiningProjects", "tag_id": "265ec3a0-5c35-44f8-8f70-75802937a4a5", "created_at": "2026-05-06T06:49:54.054Z"}	2026-05-05 23:49:54.056-07
16e43707-a9b3-4526-8c8c-da596e7b0f54	00000000-0000-4000-8000-000000000001	CREATE	Tag	664985fa-a6a7-4c32-b2e7-3f03ac47300b	\N	{"name": "Manufacturing", "tag_id": "664985fa-a6a7-4c32-b2e7-3f03ac47300b", "created_at": "2026-05-06T06:50:06.673Z"}	2026-05-05 23:50:06.674-07
09d3069b-2d49-4412-a3ae-9482b02982ba	\N	CREATE	Attachment	bf4fa4d0-de4a-42a9-8b05-d5e86ba68569	\N	{"file_name": "1778050463930-657401390_photo_2026-05-06_09-53-28.jpg", "file_path": "uploads/attachments/1778050463930-657401390_photo_2026-05-06_09-53-28.jpg", "created_at": "2026-05-06T06:54:23.932Z", "uploaded_by": null, "attachment_id": "bf4fa4d0-de4a-42a9-8b05-d5e86ba68569"}	2026-05-05 23:54:23.953-07
3a8d8b58-7b7d-4035-a88e-418560a250a2	\N	CREATE	Attachment	e05d8984-7cec-4f45-9210-8b8bf89e57f6	\N	{"file_name": "1778050463999-826829435_photo_2026-05-06_09-53-48.jpg", "file_path": "uploads/attachments/1778050463999-826829435_photo_2026-05-06_09-53-48.jpg", "created_at": "2026-05-06T06:54:24.002Z", "uploaded_by": null, "attachment_id": "e05d8984-7cec-4f45-9210-8b8bf89e57f6"}	2026-05-05 23:54:24.005-07
1d8352de-45cc-48e2-aa11-55d6fc99a8d6	\N	CREATE	Attachment	9fd1eb29-7cb4-4c9a-b394-1911f92f07b1	\N	{"file_name": "1778050464009-912461945_photo_2026-05-06_09-54-00.jpg", "file_path": "uploads/attachments/1778050464009-912461945_photo_2026-05-06_09-54-00.jpg", "created_at": "2026-05-06T06:54:24.011Z", "uploaded_by": null, "attachment_id": "9fd1eb29-7cb4-4c9a-b394-1911f92f07b1"}	2026-05-05 23:54:24.014-07
2122ff97-ebc3-4635-ad67-680effab50f6	\N	CREATE	Attachment	95791248-c580-4f26-95fe-3a7abba27676	\N	{"file_name": "1778050464010-57329322_photo_2026-05-06_09-53-43.jpg", "file_path": "uploads/attachments/1778050464010-57329322_photo_2026-05-06_09-53-43.jpg", "created_at": "2026-05-06T06:54:24.013Z", "uploaded_by": null, "attachment_id": "95791248-c580-4f26-95fe-3a7abba27676"}	2026-05-05 23:54:24.016-07
a12a9932-18c3-4018-89fd-cdb1dc21574c	\N	CREATE	Attachment	d8b81d23-4ca8-4240-8261-b43b907160b2	\N	{"file_name": "1778050464019-39263597_photo_2026-05-06_09-53-57.jpg", "file_path": "uploads/attachments/1778050464019-39263597_photo_2026-05-06_09-53-57.jpg", "created_at": "2026-05-06T06:54:24.022Z", "uploaded_by": null, "attachment_id": "d8b81d23-4ca8-4240-8261-b43b907160b2"}	2026-05-05 23:54:24.027-07
c90990d4-fe0a-4cab-8469-45628697f8c7	\N	CREATE	Attachment	404ac6db-b2fc-43b8-95ad-7436451675dc	\N	{"file_name": "1778050464051-639965731_photo_2026-05-06_09-54-04.jpg", "file_path": "uploads/attachments/1778050464051-639965731_photo_2026-05-06_09-54-04.jpg", "created_at": "2026-05-06T06:54:24.052Z", "uploaded_by": null, "attachment_id": "404ac6db-b2fc-43b8-95ad-7436451675dc"}	2026-05-05 23:54:24.055-07
77ab19fa-6740-4f0a-8234-7f2d89830f4f	\N	CREATE	Attachment	e72072dd-1024-4306-a671-7936c22589a7	\N	{"file_name": "1778050464080-949460906_photo_2026-05-06_09-54-07.jpg", "file_path": "uploads/attachments/1778050464080-949460906_photo_2026-05-06_09-54-07.jpg", "created_at": "2026-05-06T06:54:24.081Z", "uploaded_by": null, "attachment_id": "e72072dd-1024-4306-a671-7936c22589a7"}	2026-05-05 23:54:24.083-07
7bb6cf9c-5ffd-4d95-a077-0ea3c208076d	00000000-0000-4000-8000-000000000001	CREATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	\N	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</p><p>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p><p>Email:&nbsp;info@mom.gov.et</p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:54:34.233Z", "published_at": "2026-03-23T03:50:00.000Z"}	2026-05-05 23:54:34.235-07
68fcba5e-95e9-4855-99b3-546c5c014629	00000000-0000-4000-8000-000000000001	CREATE	NewsMetadata	4acc6d85-3b28-42b6-880c-ac10b3c81b5d	\N	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.244Z", "like_count": 0, "read_count": 0, "updated_at": "2026-05-06T06:54:34.244Z", "dislike_count": 0, "news_metadata_id": "4acc6d85-3b28-42b6-880c-ac10b3c81b5d", "average_read_time": 0}	2026-05-05 23:54:34.246-07
4e9ec9a8-b843-47d6-aa1a-a117fa4bc289	00000000-0000-4000-8000-000000000001	CREATE	NewsReaction	400c9a67-592a-493e-b411-40cc3341cea8	\N	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "reaction": "like", "created_at": "2026-05-06T06:55:00.816Z", "ip_address": "::ffff:172.18.0.6", "news_reaction_id": "400c9a67-592a-493e-b411-40cc3341cea8"}	2026-05-05 23:55:00.818-07
9feb0778-45f5-418b-bdf3-387842878acd	\N	CREATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	\N	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:55:08.331Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 10}	2026-05-05 23:55:08.346-07
df5aa747-1fe9-447e-9b20-60f8ae4ea52b	00000000-0000-4000-8000-000000000001	UPDATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</p><p>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p><p>Email:&nbsp;info@mom.gov.et</p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:54:34.233Z", "published_at": "2026-03-23T03:50:00.000Z"}	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:01.708Z", "published_at": "2026-03-23T00:50:00.000Z"}	2026-05-05 23:57:01.709-07
e8bca8cc-0d54-4e1b-8c8d-ee80b23cbaf2	00000000-0000-4000-8000-000000000001	UPDATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:01.708Z", "published_at": "2026-03-23T00:50:00.000Z"}	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:03.051Z", "published_at": "2026-03-22T21:50:00.000Z"}	2026-05-05 23:57:03.053-07
77b3dd9d-1d05-4a18-8e9e-9581df55a59f	00000000-0000-4000-8000-000000000001	UPDATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:03.051Z", "published_at": "2026-03-22T21:50:00.000Z"}	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:03.259Z", "published_at": "2026-03-22T18:50:00.000Z"}	2026-05-05 23:57:03.26-07
ec573edc-e6b0-41e3-9b06-a56246d8dc9c	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:55:08.331Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 10}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:57:16.555Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 20}	2026-05-05 23:57:16.561-07
9ab68bfa-550f-4c82-b4a7-dc6b60ae3a7f	00000000-0000-4000-8000-000000000001	UPDATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em style=\\"background-color: rgb(102, 163, 224);\\">Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:03.259Z", "published_at": "2026-03-22T18:50:00.000Z"}	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em>Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:35.393Z", "published_at": "2026-03-22T15:50:00.000Z"}	2026-05-05 23:57:35.395-07
bc581979-38b3-4f5d-a64f-fde89bb64bce	00000000-0000-4000-8000-000000000001	UPDATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em>Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:35.393Z", "published_at": "2026-03-22T15:50:00.000Z"}	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em>Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:36.010Z", "published_at": "2026-03-22T12:50:00.000Z"}	2026-05-05 23:57:36.011-07
e876643a-f960-4b0c-be2f-0c090aa231b3	00000000-0000-4000-8000-000000000001	UPDATE	News	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em>Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:36.010Z", "published_at": "2026-03-22T12:50:00.000Z"}	{"title": "Rapid Completion of Mining Projects is Transforming Work Culture", "author": "Minstry of MInes", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em>Email:&nbsp;info@mom.gov.et</em></p>", "news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "created_at": "2026-05-06T06:54:34.233Z", "deleted_at": null, "updated_at": "2026-05-06T06:57:36.218Z", "published_at": "2026-03-22T09:50:00.000Z"}	2026-05-05 23:57:36.22-07
cb731975-c363-4f10-8b96-18bac5e8276c	00000000-0000-4000-8000-000000000001	UPDATE	News	c9f69b86-b02f-4e0a-9c42-9520683613aa	{"title": "Support Provided to Muslim Employees on the Occasion of Eid al-Fitr", "author": "Minstry of Mines", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;10,&nbsp;2018&nbsp;E.C.)</em></strong>&nbsp;Financial&nbsp;and&nbsp;material&nbsp;support&nbsp;was&nbsp;extended&nbsp;to&nbsp;Muslim&nbsp;employees&nbsp;of&nbsp;the&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;the&nbsp;Ethiopian&nbsp;Geological&nbsp;Institute,&nbsp;and&nbsp;the&nbsp;Mining&nbsp;Industry&nbsp;Development&nbsp;Institute&nbsp;in&nbsp;celebration&nbsp;of&nbsp;Eid&nbsp;al-Fitr.</p><p></p><p>This&nbsp;initiative&nbsp;was&nbsp;organized&nbsp;not&nbsp;only&nbsp;to&nbsp;assist&nbsp;employees&nbsp;during&nbsp;the&nbsp;holiday&nbsp;but&nbsp;also&nbsp;to&nbsp;express&nbsp;appreciation,&nbsp;solidarity,&nbsp;and&nbsp;recognition&nbsp;of&nbsp;their&nbsp;contributions&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;It&nbsp;reflects&nbsp;the&nbsp;institutions’&nbsp;commitment&nbsp;to&nbsp;fostering&nbsp;an&nbsp;inclusive&nbsp;and&nbsp;supportive&nbsp;workplace&nbsp;culture&nbsp;that&nbsp;respects&nbsp;religious&nbsp;and&nbsp;cultural&nbsp;values.&nbsp;By&nbsp;marking&nbsp;this&nbsp;important&nbsp;occasion,&nbsp;the&nbsp;Ministry&nbsp;and&nbsp;its&nbsp;affiliated&nbsp;institutions&nbsp;aim&nbsp;to&nbsp;strengthen&nbsp;unity,&nbsp;morale,&nbsp;and&nbsp;a&nbsp;sense&nbsp;of&nbsp;community&nbsp;among&nbsp;employees.</p><p></p><p>The&nbsp;support&nbsp;also&nbsp;served&nbsp;as&nbsp;a&nbsp;gesture&nbsp;of&nbsp;goodwill,&nbsp;conveying&nbsp;warm&nbsp;Eid&nbsp;greetings&nbsp;and&nbsp;best&nbsp;wishes&nbsp;to&nbsp;Muslim&nbsp;staff&nbsp;across&nbsp;the&nbsp;sector.</p><p></p><p></p><p><strong>Twitter:</strong>&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</p><p><strong>Website:</strong>&nbsp;<a href=\\"http://www.mom.gov.et\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">www.mom.gov.et</a></p><p><strong>Facebook:&nbsp;</strong><a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p><strong>Telegram:</strong>&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p><p><strong>Email:</strong>&nbsp;info@mom.gov.et</p>", "news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "created_at": "2026-05-06T06:44:54.851Z", "deleted_at": null, "updated_at": "2026-05-06T06:44:54.851Z", "published_at": "2026-03-19T03:39:00.000Z"}	{"title": "Support Provided to Muslim Employees on the Occasion of Eid al-Fitr", "author": "Minstry of Mines", "status": "published", "content": "<p><strong><em>(Megabit&nbsp;10,&nbsp;2018&nbsp;E.C.)</em></strong>&nbsp;Financial&nbsp;and&nbsp;material&nbsp;support&nbsp;was&nbsp;extended&nbsp;to&nbsp;Muslim&nbsp;employees&nbsp;of&nbsp;the&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;the&nbsp;Ethiopian&nbsp;Geological&nbsp;Institute,&nbsp;and&nbsp;the&nbsp;Mining&nbsp;Industry&nbsp;Development&nbsp;Institute&nbsp;in&nbsp;celebration&nbsp;of&nbsp;Eid&nbsp;al-Fitr.</p><p></p><p>This&nbsp;initiative&nbsp;was&nbsp;organized&nbsp;not&nbsp;only&nbsp;to&nbsp;assist&nbsp;employees&nbsp;during&nbsp;the&nbsp;holiday&nbsp;but&nbsp;also&nbsp;to&nbsp;express&nbsp;appreciation,&nbsp;solidarity,&nbsp;and&nbsp;recognition&nbsp;of&nbsp;their&nbsp;contributions&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;It&nbsp;reflects&nbsp;the&nbsp;institutions’&nbsp;commitment&nbsp;to&nbsp;fostering&nbsp;an&nbsp;inclusive&nbsp;and&nbsp;supportive&nbsp;workplace&nbsp;culture&nbsp;that&nbsp;respects&nbsp;religious&nbsp;and&nbsp;cultural&nbsp;values.&nbsp;By&nbsp;marking&nbsp;this&nbsp;important&nbsp;occasion,&nbsp;the&nbsp;Ministry&nbsp;and&nbsp;its&nbsp;affiliated&nbsp;institutions&nbsp;aim&nbsp;to&nbsp;strengthen&nbsp;unity,&nbsp;morale,&nbsp;and&nbsp;a&nbsp;sense&nbsp;of&nbsp;community&nbsp;among&nbsp;employees.</p><p></p><p>The&nbsp;support&nbsp;also&nbsp;served&nbsp;as&nbsp;a&nbsp;gesture&nbsp;of&nbsp;goodwill,&nbsp;conveying&nbsp;warm&nbsp;Eid&nbsp;greetings&nbsp;and&nbsp;best&nbsp;wishes&nbsp;to&nbsp;Muslim&nbsp;staff&nbsp;across&nbsp;the&nbsp;sector.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><strong><em>Twitter:</em></strong><em>&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a></em></p><p><strong><em>Facebook:&nbsp;</em></strong><em><a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><strong><em>Telegram:</em></strong><em>&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><strong><em>Email:</em></strong><em>&nbsp;info@mom.gov.et</em></p>", "news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "created_at": "2026-05-06T06:44:54.851Z", "deleted_at": null, "updated_at": "2026-05-06T06:58:44.390Z", "published_at": "2026-03-19T00:39:00.000Z"}	2026-05-05 23:58:44.392-07
04528cb9-fd0d-41de-b231-c745287c6036	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:57:16.555Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 20}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:59:00.581Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 30}	2026-05-05 23:59:00.585-07
9a3d0d92-59fe-42b1-961f-b4c23878ef2c	00000000-0000-4000-8000-000000000001	CREATE	Tag	0bb19d7b-5369-4aa1-ad8c-05b465083b9a	\N	{"name": "EconomicGrowth", "tag_id": "0bb19d7b-5369-4aa1-ad8c-05b465083b9a", "created_at": "2026-05-06T07:00:56.525Z"}	2026-05-06 00:00:56.528-07
c04c6cb9-1393-4e67-8439-456e6947abf2	\N	CREATE	Attachment	3f0839c6-8870-4825-b16d-0abb7374f1df	\N	{"file_name": "1778051053720-231975946_photo_2026-05-06_10-03-48.jpg", "file_path": "uploads/attachments/1778051053720-231975946_photo_2026-05-06_10-03-48.jpg", "created_at": "2026-05-06T07:04:13.723Z", "uploaded_by": null, "attachment_id": "3f0839c6-8870-4825-b16d-0abb7374f1df"}	2026-05-06 00:04:13.728-07
9f051cfa-0a9b-48c8-bea2-b19bd461d397	\N	CREATE	Attachment	5028c83b-3d00-4256-98cb-ee8ac98b5a01	\N	{"file_name": "1778051070982-793945096_photo_2026-05-06_10-03-21.jpg", "file_path": "uploads/attachments/1778051070982-793945096_photo_2026-05-06_10-03-21.jpg", "created_at": "2026-05-06T07:04:30.984Z", "uploaded_by": null, "attachment_id": "5028c83b-3d00-4256-98cb-ee8ac98b5a01"}	2026-05-06 00:04:31.008-07
6ebbf103-0cc8-4783-acd9-73db0344eae3	\N	CREATE	Attachment	4bd767e5-b064-473d-8516-d29675c528d2	\N	{"file_name": "1778051070997-192801565_photo_2026-05-06_10-03-44.jpg", "file_path": "uploads/attachments/1778051070997-192801565_photo_2026-05-06_10-03-44.jpg", "created_at": "2026-05-06T07:04:31.000Z", "uploaded_by": null, "attachment_id": "4bd767e5-b064-473d-8516-d29675c528d2"}	2026-05-06 00:04:31.009-07
3e787af1-1955-4310-bee4-bcbaae9fa7c4	\N	CREATE	Attachment	863c82dc-5406-4a4a-83da-305c0537a65b	\N	{"file_name": "1778051071040-51896687_photo_2026-05-06_10-03-52.jpg", "file_path": "uploads/attachments/1778051071040-51896687_photo_2026-05-06_10-03-52.jpg", "created_at": "2026-05-06T07:04:31.042Z", "uploaded_by": null, "attachment_id": "863c82dc-5406-4a4a-83da-305c0537a65b"}	2026-05-06 00:04:31.046-07
9c0b7e09-0cd1-46a8-aa93-276b6b75a87f	\N	CREATE	Attachment	48ce37d2-bc37-44d6-91c1-462720a75e99	\N	{"file_name": "1778051071042-567117279_photo_2026-05-06_10-03-54.jpg", "file_path": "uploads/attachments/1778051071042-567117279_photo_2026-05-06_10-03-54.jpg", "created_at": "2026-05-06T07:04:31.044Z", "uploaded_by": null, "attachment_id": "48ce37d2-bc37-44d6-91c1-462720a75e99"}	2026-05-06 00:04:31.047-07
38bed609-f321-4d57-a2d0-6cbda4f7f573	00000000-0000-4000-8000-000000000001	CREATE	News	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	\N	{"title": "Over USD 3.5 Billion Revenue Generated from the Mining Sector in the Past 8 Months", "author": "Minstry of Mines", "status": "published", "content": "<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;together&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;conducted&nbsp;a&nbsp;joint&nbsp;review&nbsp;of&nbsp;the&nbsp;mining&nbsp;sector’s&nbsp;performance&nbsp;over&nbsp;the&nbsp;past&nbsp;eight&nbsp;months.</p><p>During&nbsp;this&nbsp;period,&nbsp;more&nbsp;than&nbsp;<strong>USD&nbsp;3.5&nbsp;billion&nbsp;in&nbsp;foreign&nbsp;exchange&nbsp;earnings</strong>&nbsp;was&nbsp;generated&nbsp;from&nbsp;gold,&nbsp;gemstones,&nbsp;and&nbsp;industrial&nbsp;minerals.&nbsp;Compared&nbsp;to&nbsp;the&nbsp;same&nbsp;period&nbsp;last&nbsp;year,&nbsp;this&nbsp;represents&nbsp;a&nbsp;<strong>27%&nbsp;increase&nbsp;in&nbsp;production&nbsp;volume</strong>&nbsp;and&nbsp;a&nbsp;<strong>92%&nbsp;increase&nbsp;in&nbsp;revenue</strong>.</p><p>Several&nbsp;mining&nbsp;projects&nbsp;were&nbsp;inaugurated&nbsp;and&nbsp;became&nbsp;operational&nbsp;during&nbsp;the&nbsp;fiscal&nbsp;year,&nbsp;contributing&nbsp;to&nbsp;improved&nbsp;performance&nbsp;in&nbsp;both&nbsp;exports&nbsp;and&nbsp;import&nbsp;substitution.&nbsp;The&nbsp;Ministry&nbsp;also&nbsp;emphasized&nbsp;that&nbsp;ongoing&nbsp;mega&nbsp;projects&nbsp;will&nbsp;continue&nbsp;to&nbsp;receive&nbsp;the&nbsp;necessary&nbsp;support&nbsp;to&nbsp;ensure&nbsp;they&nbsp;become&nbsp;operational&nbsp;in&nbsp;the&nbsp;coming&nbsp;months.</p><p>Directions&nbsp;have&nbsp;been&nbsp;set&nbsp;to&nbsp;sustain&nbsp;and&nbsp;further&nbsp;enhance&nbsp;the&nbsp;current&nbsp;achievements&nbsp;by&nbsp;focusing&nbsp;on&nbsp;key&nbsp;priority&nbsp;areas&nbsp;in&nbsp;the&nbsp;sector.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a></p><p>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p>", "news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "created_at": "2026-05-06T07:04:51.293Z", "deleted_at": null, "updated_at": "2026-05-06T07:04:51.293Z", "published_at": "2026-03-27T04:01:00.000Z"}	2026-05-06 00:04:51.297-07
7f1007d7-5809-4c2c-8d1a-9b83ab947b72	00000000-0000-4000-8000-000000000001	CREATE	NewsMetadata	9d88ead3-9049-461a-bcfa-a882f7ac21da	\N	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "created_at": "2026-05-06T07:04:51.310Z", "like_count": 0, "read_count": 0, "updated_at": "2026-05-06T07:04:51.310Z", "dislike_count": 0, "news_metadata_id": "9d88ead3-9049-461a-bcfa-a882f7ac21da", "average_read_time": 0}	2026-05-06 00:04:51.312-07
294d491e-9471-4373-a9b5-7373a3d927a1	00000000-0000-4000-8000-000000000001	CREATE	EventCategory	0a2a2ebc-5502-446f-8f00-fc63f26e5e0a	\N	{"name": "InternationalWomensDay", "created_at": "2026-05-06T07:06:21.484Z", "event_category_id": "0a2a2ebc-5502-446f-8f00-fc63f26e5e0a"}	2026-05-06 00:06:21.486-07
629f4384-761e-402a-89e0-fb7a2c554873	00000000-0000-4000-8000-000000000001	CREATE	EventCategory	7ce18cf7-e2f8-4a44-ac9a-cebae1cb0a50	\N	{"name": "GenderEquality", "created_at": "2026-05-06T07:06:29.963Z", "event_category_id": "7ce18cf7-e2f8-4a44-ac9a-cebae1cb0a50"}	2026-05-06 00:06:29.966-07
17c75f46-7e3b-4b4e-8246-784008b1412e	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:59:00.581Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 30}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:08:27.524Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 40}	2026-05-06 00:08:27.528-07
c378cdd8-c77d-48a3-a8a6-e91adae88145	\N	CREATE	Attachment	5ea5261e-d990-4838-9a28-58f1aa79b6cf	\N	{"file_name": "1778051361336-463629095_photo_2026-05-06_10-08-32.jpg", "file_path": "uploads/attachments/1778051361336-463629095_photo_2026-05-06_10-08-32.jpg", "created_at": "2026-05-06T07:09:21.340Z", "uploaded_by": null, "attachment_id": "5ea5261e-d990-4838-9a28-58f1aa79b6cf"}	2026-05-06 00:09:21.344-07
7d9deb72-f13b-4caa-862f-1ff8092c1947	\N	CREATE	Attachment	0f05c40d-ecef-45b6-8822-3d2f0dffe345	\N	{"file_name": "1778051368909-698526959_photo_2026-05-06_10-08-38.jpg", "file_path": "uploads/attachments/1778051368909-698526959_photo_2026-05-06_10-08-38.jpg", "created_at": "2026-05-06T07:09:28.910Z", "uploaded_by": null, "attachment_id": "0f05c40d-ecef-45b6-8822-3d2f0dffe345"}	2026-05-06 00:09:28.914-07
5f86375a-e8f6-48a4-b555-568568e8b7b0	\N	CREATE	Attachment	7b4c84a9-88a8-4067-b83e-c8e967189bf4	\N	{"file_name": "1778051368923-459913217_photo_2026-05-06_10-08-43.jpg", "file_path": "uploads/attachments/1778051368923-459913217_photo_2026-05-06_10-08-43.jpg", "created_at": "2026-05-06T07:09:28.924Z", "uploaded_by": null, "attachment_id": "7b4c84a9-88a8-4067-b83e-c8e967189bf4"}	2026-05-06 00:09:28.926-07
ab39b7e7-f38c-4048-a4a1-478eb80acdb0	\N	CREATE	Attachment	ddeba2d0-a17e-4251-8d08-55c1f8945841	\N	{"file_name": "1778051368947-876091022_photo_2026-05-06_10-08-48.jpg", "file_path": "uploads/attachments/1778051368947-876091022_photo_2026-05-06_10-08-48.jpg", "created_at": "2026-05-06T07:09:28.953Z", "uploaded_by": null, "attachment_id": "ddeba2d0-a17e-4251-8d08-55c1f8945841"}	2026-05-06 00:09:28.958-07
e3d14f40-00e1-411a-ba2c-b1a6c581d182	\N	CREATE	Attachment	e37ae1be-549b-40b3-bed0-6bb05cce942f	\N	{"file_name": "1778051368951-165305823_photo_2026-05-06_10-08-56.jpg", "file_path": "uploads/attachments/1778051368951-165305823_photo_2026-05-06_10-08-56.jpg", "created_at": "2026-05-06T07:09:28.957Z", "uploaded_by": null, "attachment_id": "e37ae1be-549b-40b3-bed0-6bb05cce942f"}	2026-05-06 00:09:28.961-07
46d43365-0973-4741-8230-8a9ab37d9997	\N	CREATE	Attachment	1e68b79c-9fc7-4feb-944f-4a812533c9f6	\N	{"file_name": "1778051368956-625091960_photo_2026-05-06_10-08-59.jpg", "file_path": "uploads/attachments/1778051368956-625091960_photo_2026-05-06_10-08-59.jpg", "created_at": "2026-05-06T07:09:28.961Z", "uploaded_by": null, "attachment_id": "1e68b79c-9fc7-4feb-944f-4a812533c9f6"}	2026-05-06 00:09:28.967-07
1c89afca-3cd9-4c27-9d00-7c81b2e76820	00000000-0000-4000-8000-000000000001	CREATE	Event	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	\N	{"title": "Celebration of International Women’s Day in the Mining Sector", "status": "published", "content": "<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;along&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;celebrated&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;through&nbsp;various&nbsp;events&nbsp;and&nbsp;discussions.&nbsp;The&nbsp;celebration&nbsp;highlighted&nbsp;ongoing&nbsp;efforts&nbsp;to&nbsp;enhance&nbsp;women’s&nbsp;participation,&nbsp;contribution,&nbsp;and&nbsp;benefits&nbsp;within&nbsp;the&nbsp;mining&nbsp;sector.</p><p>Observed&nbsp;under&nbsp;the&nbsp;theme&nbsp;<strong>“Women’s&nbsp;Voice&nbsp;for&nbsp;Equality&nbsp;and&nbsp;a&nbsp;Prosperous&nbsp;Ethiopia,”</strong>&nbsp;the&nbsp;event&nbsp;marked&nbsp;the&nbsp;50th&nbsp;celebration&nbsp;in&nbsp;Ethiopia&nbsp;and&nbsp;the&nbsp;115th&nbsp;globally.&nbsp;Discussions&nbsp;emphasized&nbsp;the&nbsp;importance&nbsp;of&nbsp;strengthening&nbsp;gender&nbsp;equality,&nbsp;empowering&nbsp;women,&nbsp;and&nbsp;ensuring&nbsp;inclusive&nbsp;growth&nbsp;within&nbsp;the&nbsp;sector.</p><p>The&nbsp;event&nbsp;also&nbsp;acknowledged&nbsp;the&nbsp;broader&nbsp;significance&nbsp;of&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;in&nbsp;promoting&nbsp;women’s&nbsp;social,&nbsp;economic,&nbsp;political,&nbsp;and&nbsp;cultural&nbsp;contributions,&nbsp;while&nbsp;advancing&nbsp;gender&nbsp;equality&nbsp;and&nbsp;women’s&nbsp;rights.</p>", "end_time": "2026-03-14T07:09:00.000Z", "event_id": "9bfe3915-2481-42c6-81c6-72ae8d3e7bf6", "location": "Minstry of Mines", "organizer": "Minstry of Mines", "created_at": "2026-05-06T07:11:30.346Z", "created_by": null, "deleted_at": null, "start_time": "2026-03-13T07:09:00.000Z", "updated_at": "2026-05-06T07:11:30.346Z", "approved_at": null, "approved_by": null, "description": "The Ministry of Mines celebrated International Women’s Day, emphasizing women’s empowerment, participation, and equality in the mining sector.", "publish_end": "2026-05-06T07:15:00.000Z", "published_at": null, "virtual_link": "https://www.mom.gov.et/en", "publish_start": "2026-05-06T07:10:00.000Z", "event_category_id": "0a2a2ebc-5502-446f-8f00-fc63f26e5e0a"}	2026-05-06 00:11:30.349-07
cca7a11e-8a5f-4151-b0a2-95b849d0973c	\N	CREATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	\N	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:14:51.509Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 10}	2026-05-06 00:14:51.528-07
59a815a7-7425-4c13-873c-91d3eb52a2d3	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:14:51.509Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 10}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:16:36.900Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 20}	2026-05-06 00:16:36.903-07
60c920ed-809b-4c08-aea3-ec70ef362fb4	00000000-0000-4000-8000-000000000001	UPDATE	Event	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	{"title": "Celebration of International Women’s Day in the Mining Sector", "status": "archived", "content": "<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;along&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;celebrated&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;through&nbsp;various&nbsp;events&nbsp;and&nbsp;discussions.&nbsp;The&nbsp;celebration&nbsp;highlighted&nbsp;ongoing&nbsp;efforts&nbsp;to&nbsp;enhance&nbsp;women’s&nbsp;participation,&nbsp;contribution,&nbsp;and&nbsp;benefits&nbsp;within&nbsp;the&nbsp;mining&nbsp;sector.</p><p>Observed&nbsp;under&nbsp;the&nbsp;theme&nbsp;<strong>“Women’s&nbsp;Voice&nbsp;for&nbsp;Equality&nbsp;and&nbsp;a&nbsp;Prosperous&nbsp;Ethiopia,”</strong>&nbsp;the&nbsp;event&nbsp;marked&nbsp;the&nbsp;50th&nbsp;celebration&nbsp;in&nbsp;Ethiopia&nbsp;and&nbsp;the&nbsp;115th&nbsp;globally.&nbsp;Discussions&nbsp;emphasized&nbsp;the&nbsp;importance&nbsp;of&nbsp;strengthening&nbsp;gender&nbsp;equality,&nbsp;empowering&nbsp;women,&nbsp;and&nbsp;ensuring&nbsp;inclusive&nbsp;growth&nbsp;within&nbsp;the&nbsp;sector.</p><p>The&nbsp;event&nbsp;also&nbsp;acknowledged&nbsp;the&nbsp;broader&nbsp;significance&nbsp;of&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;in&nbsp;promoting&nbsp;women’s&nbsp;social,&nbsp;economic,&nbsp;political,&nbsp;and&nbsp;cultural&nbsp;contributions,&nbsp;while&nbsp;advancing&nbsp;gender&nbsp;equality&nbsp;and&nbsp;women’s&nbsp;rights.</p>", "end_time": "2026-03-14T07:09:00.000Z", "event_id": "9bfe3915-2481-42c6-81c6-72ae8d3e7bf6", "location": "Minstry of Mines", "organizer": "Minstry of Mines", "created_at": "2026-05-06T07:11:30.346Z", "created_by": null, "deleted_at": null, "start_time": "2026-03-13T07:09:00.000Z", "updated_at": "2026-05-06T07:11:30.346Z", "approved_at": null, "approved_by": null, "description": "The Ministry of Mines celebrated International Women’s Day, emphasizing women’s empowerment, participation, and equality in the mining sector.", "publish_end": "2026-05-06T07:15:00.000Z", "published_at": null, "virtual_link": "https://www.mom.gov.et/en", "publish_start": "2026-05-06T07:10:00.000Z", "event_category_id": "0a2a2ebc-5502-446f-8f00-fc63f26e5e0a"}	{"title": "Celebration of International Women’s Day in the Mining Sector", "status": "published", "content": "<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;along&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;celebrated&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;through&nbsp;various&nbsp;events&nbsp;and&nbsp;discussions.&nbsp;The&nbsp;celebration&nbsp;highlighted&nbsp;ongoing&nbsp;efforts&nbsp;to&nbsp;enhance&nbsp;women’s&nbsp;participation,&nbsp;contribution,&nbsp;and&nbsp;benefits&nbsp;within&nbsp;the&nbsp;mining&nbsp;sector.</p><p>Observed&nbsp;under&nbsp;the&nbsp;theme&nbsp;<strong>“Women’s&nbsp;Voice&nbsp;for&nbsp;Equality&nbsp;and&nbsp;a&nbsp;Prosperous&nbsp;Ethiopia,”</strong>&nbsp;the&nbsp;event&nbsp;marked&nbsp;the&nbsp;50th&nbsp;celebration&nbsp;in&nbsp;Ethiopia&nbsp;and&nbsp;the&nbsp;115th&nbsp;globally.&nbsp;Discussions&nbsp;emphasized&nbsp;the&nbsp;importance&nbsp;of&nbsp;strengthening&nbsp;gender&nbsp;equality,&nbsp;empowering&nbsp;women,&nbsp;and&nbsp;ensuring&nbsp;inclusive&nbsp;growth&nbsp;within&nbsp;the&nbsp;sector.</p><p>The&nbsp;event&nbsp;also&nbsp;acknowledged&nbsp;the&nbsp;broader&nbsp;significance&nbsp;of&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;in&nbsp;promoting&nbsp;women’s&nbsp;social,&nbsp;economic,&nbsp;political,&nbsp;and&nbsp;cultural&nbsp;contributions,&nbsp;while&nbsp;advancing&nbsp;gender&nbsp;equality&nbsp;and&nbsp;women’s&nbsp;rights.</p>", "end_time": "2026-03-14T04:09:00.000Z", "event_id": "9bfe3915-2481-42c6-81c6-72ae8d3e7bf6", "location": "Minstry of Mines", "organizer": "Minstry of Mines", "created_at": "2026-05-06T07:11:30.346Z", "created_by": null, "deleted_at": null, "start_time": "2026-03-13T04:09:00.000Z", "updated_at": "2026-05-06T07:17:44.470Z", "approved_at": null, "approved_by": null, "description": "The Ministry of Mines celebrated International Women’s Day, emphasizing women’s empowerment, participation, and equality in the mining sector.", "publish_end": "2027-02-06T05:15:00.000Z", "published_at": "2026-05-06T07:17:44.471Z", "virtual_link": "https://www.mom.gov.et/en", "publish_start": "2026-05-06T04:10:00.000Z", "event_category_id": "0a2a2ebc-5502-446f-8f00-fc63f26e5e0a"}	2026-05-06 00:17:44.472-07
41c8eb00-3fd9-4a93-b7f8-dcf2f90e6b09	00000000-0000-4000-8000-000000000001	CREATE	NewsReaction	80fb2f1f-37d8-4d1c-8bd3-471e9ef8c572	\N	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "reaction": "like", "created_at": "2026-05-06T07:20:09.465Z", "ip_address": "::ffff:172.18.0.6", "news_reaction_id": "80fb2f1f-37d8-4d1c-8bd3-471e9ef8c572"}	2026-05-06 00:20:09.468-07
5a074d03-b40f-4d49-8727-ac630b7aa8a3	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:16:36.900Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 20}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:20:16.787Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 30}	2026-05-06 00:20:16.79-07
6f5f6d26-efb8-466a-b68b-f0c94140d080	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T12:26:39.168Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 80}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T18:29:02.890Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 90}	2026-05-07 11:29:02.895-07
ddac0437-90b8-4bc6-b4b6-3f2d40c37e2e	00000000-0000-4000-8000-000000000001	UPDATE	News	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	{"title": "Over USD 3.5 Billion Revenue Generated from the Mining Sector in the Past 8 Months", "author": "Minstry of Mines", "status": "published", "content": "<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;together&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;conducted&nbsp;a&nbsp;joint&nbsp;review&nbsp;of&nbsp;the&nbsp;mining&nbsp;sector’s&nbsp;performance&nbsp;over&nbsp;the&nbsp;past&nbsp;eight&nbsp;months.</p><p>During&nbsp;this&nbsp;period,&nbsp;more&nbsp;than&nbsp;<strong>USD&nbsp;3.5&nbsp;billion&nbsp;in&nbsp;foreign&nbsp;exchange&nbsp;earnings</strong>&nbsp;was&nbsp;generated&nbsp;from&nbsp;gold,&nbsp;gemstones,&nbsp;and&nbsp;industrial&nbsp;minerals.&nbsp;Compared&nbsp;to&nbsp;the&nbsp;same&nbsp;period&nbsp;last&nbsp;year,&nbsp;this&nbsp;represents&nbsp;a&nbsp;<strong>27%&nbsp;increase&nbsp;in&nbsp;production&nbsp;volume</strong>&nbsp;and&nbsp;a&nbsp;<strong>92%&nbsp;increase&nbsp;in&nbsp;revenue</strong>.</p><p>Several&nbsp;mining&nbsp;projects&nbsp;were&nbsp;inaugurated&nbsp;and&nbsp;became&nbsp;operational&nbsp;during&nbsp;the&nbsp;fiscal&nbsp;year,&nbsp;contributing&nbsp;to&nbsp;improved&nbsp;performance&nbsp;in&nbsp;both&nbsp;exports&nbsp;and&nbsp;import&nbsp;substitution.&nbsp;The&nbsp;Ministry&nbsp;also&nbsp;emphasized&nbsp;that&nbsp;ongoing&nbsp;mega&nbsp;projects&nbsp;will&nbsp;continue&nbsp;to&nbsp;receive&nbsp;the&nbsp;necessary&nbsp;support&nbsp;to&nbsp;ensure&nbsp;they&nbsp;become&nbsp;operational&nbsp;in&nbsp;the&nbsp;coming&nbsp;months.</p><p>Directions&nbsp;have&nbsp;been&nbsp;set&nbsp;to&nbsp;sustain&nbsp;and&nbsp;further&nbsp;enhance&nbsp;the&nbsp;current&nbsp;achievements&nbsp;by&nbsp;focusing&nbsp;on&nbsp;key&nbsp;priority&nbsp;areas&nbsp;in&nbsp;the&nbsp;sector.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a></p><p>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p>", "news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "created_at": "2026-05-06T07:04:51.293Z", "deleted_at": null, "updated_at": "2026-05-06T07:04:51.293Z", "published_at": "2026-03-27T04:01:00.000Z"}	{"title": "Over USD 3.5 Billion Revenue Generated from the Mining Sector in the Past 8 Months", "author": "Minstry of Mines", "status": "published", "content": "<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;together&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;conducted&nbsp;a&nbsp;joint&nbsp;review&nbsp;of&nbsp;the&nbsp;mining&nbsp;sector’s&nbsp;performance&nbsp;over&nbsp;the&nbsp;past&nbsp;eight&nbsp;months.</p><p></p><p>During&nbsp;this&nbsp;period,&nbsp;more&nbsp;than&nbsp;<strong>USD&nbsp;3.5&nbsp;billion&nbsp;in&nbsp;foreign&nbsp;exchange&nbsp;earnings</strong>&nbsp;was&nbsp;generated&nbsp;from&nbsp;gold,&nbsp;gemstones,&nbsp;and&nbsp;industrial&nbsp;minerals.&nbsp;Compared&nbsp;to&nbsp;the&nbsp;same&nbsp;period&nbsp;last&nbsp;year,&nbsp;this&nbsp;represents&nbsp;a&nbsp;<strong>27%&nbsp;increase&nbsp;in&nbsp;production&nbsp;volume</strong>&nbsp;and&nbsp;a&nbsp;<strong>92%&nbsp;increase&nbsp;in&nbsp;revenue</strong>.</p><p>Several&nbsp;mining&nbsp;projects&nbsp;were&nbsp;inaugurated&nbsp;and&nbsp;became&nbsp;operational&nbsp;during&nbsp;the&nbsp;fiscal&nbsp;year,&nbsp;contributing&nbsp;to&nbsp;improved&nbsp;performance&nbsp;in&nbsp;both&nbsp;exports&nbsp;and&nbsp;import&nbsp;substitution.&nbsp;The&nbsp;Ministry&nbsp;also&nbsp;emphasized&nbsp;that&nbsp;ongoing&nbsp;mega&nbsp;projects&nbsp;will&nbsp;continue&nbsp;to&nbsp;receive&nbsp;the&nbsp;necessary&nbsp;support&nbsp;to&nbsp;ensure&nbsp;they&nbsp;become&nbsp;operational&nbsp;in&nbsp;the&nbsp;coming&nbsp;months.</p><p>Directions&nbsp;have&nbsp;been&nbsp;set&nbsp;to&nbsp;sustain&nbsp;and&nbsp;further&nbsp;enhance&nbsp;the&nbsp;current&nbsp;achievements&nbsp;by&nbsp;focusing&nbsp;on&nbsp;key&nbsp;priority&nbsp;areas&nbsp;in&nbsp;the&nbsp;sector.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a></p><p>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p>", "news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "created_at": "2026-05-06T07:04:51.293Z", "deleted_at": null, "updated_at": "2026-05-06T07:24:26.087Z", "published_at": "2026-03-27T01:01:00.000Z"}	2026-05-06 00:24:26.089-07
d05c03f8-af0d-4a88-8d7a-46ff54cce41a	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:20:16.787Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 30}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:33:45.359Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 40}	2026-05-06 00:33:45.364-07
426487d1-bb72-434e-b3c6-91c0bec35564	00000000-0000-4000-8000-000000000001	DELETE	NewsReaction	80fb2f1f-37d8-4d1c-8bd3-471e9ef8c572	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "reaction": "like", "created_at": "2026-05-06T07:20:09.465Z", "ip_address": "::ffff:172.18.0.6", "news_reaction_id": "80fb2f1f-37d8-4d1c-8bd3-471e9ef8c572"}	\N	2026-05-06 00:33:47.321-07
60a78b5b-6beb-4072-904e-f56c90a7025b	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:33:45.359Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 40}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:35:24.567Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 50}	2026-05-06 00:35:24.57-07
a05cd7b3-9a7e-475e-a021-3b549945a7c8	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:08:27.524Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 40}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:40:24.463Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 50}	2026-05-06 00:40:24.467-07
140e9ed1-c2b1-4f46-9b53-3183e770b25f	\N	DELETE	Attachment	c24e64f3-ee10-4ed6-b40f-ec6668b87236	{"file_name": "1777883521796-869562100_Untitled_design.png", "file_path": "uploads/attachments/1777883521796-869562100_Untitled_design.png", "created_at": "2026-05-04T08:32:01.802Z", "uploaded_by": null, "attachment_id": "c24e64f3-ee10-4ed6-b40f-ec6668b87236"}	\N	2026-05-06 00:42:14.273-07
4e7fbe7e-02ea-48f7-96cf-ab16799dfd52	00000000-0000-4000-8000-000000000001	UPDATE	Strategy	2a6c650b-a22d-4290-8689-613102263826	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-05T10:55:19.052Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	{"title": "Our Mission, Vision & Core Values", "created_at": "2026-04-29T06:11:02.393Z", "deleted_at": null, "updated_at": "2026-05-06T07:44:02.898Z", "description": "Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.", "strategy_id": "2a6c650b-a22d-4290-8689-613102263826"}	2026-05-06 00:44:02.899-07
b742da2e-e1b9-412f-b1fa-4b5d9f45366c	00000000-0000-4000-8000-000000000001	UPDATE	MiningRegulationProcess	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	{"title": "Mining Licensing and Legislations", "publish": false, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-04-29T12:30:47.725Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-04-29T12:30:47.725Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	{"title": "Mining Licensing and Legislations", "publish": true, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-05-06T07:47:54.636Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-05-06T07:47:54.635Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-05-06 00:47:54.638-07
931b50f0-bf67-4e56-a7ff-13aa4560f376	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	53cf7e4d-e3c4-44c6-a822-924e598c653b	\N	{"icon": "FileChartColumnIncreasingIcon", "title": "Important Directives", "createdAt": "2026-05-06T07:47:54.644Z", "updatedAt": "2026-05-06T07:47:54.644Z", "created_at": "2026-05-06T07:47:54.644Z", "deleted_at": null, "updated_at": "2026-05-06T07:47:54.644Z", "description": null, "mining_guideline_id": "53cf7e4d-e3c4-44c6-a822-924e598c653b", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-05-06 00:47:54.646-07
6186b99b-e362-468b-b676-1072551d4975	00000000-0000-4000-8000-000000000001	CREATE	MiningGuideline	7892358a-ddf5-4148-bc6c-1e205209af3b	\N	{"icon": "ArrowUpLeftSquareIcon", "title": "Operational Guidelines", "createdAt": "2026-05-06T07:47:54.649Z", "updatedAt": "2026-05-06T07:47:54.649Z", "created_at": "2026-05-06T07:47:54.649Z", "deleted_at": null, "updated_at": "2026-05-06T07:47:54.649Z", "description": "We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties", "mining_guideline_id": "7892358a-ddf5-4148-bc6c-1e205209af3b", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-05-06 00:47:54.65-07
98e7ddb1-9be6-4c36-9d74-c114adbffe0f	00000000-0000-4000-8000-000000000001	CREATE	MiningService	14996dc6-4bb3-4f4e-9418-6574c7745941	\N	{"title": "Licensing  Service", "createdAt": "2026-05-06T07:47:54.653Z", "updatedAt": "2026-05-06T07:47:54.653Z", "created_at": "2026-05-06T07:47:54.653Z", "deleted_at": null, "updated_at": "2026-05-06T07:47:54.653Z", "description": "The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:", "mining_service_id": "14996dc6-4bb3-4f4e-9418-6574c7745941", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-05-06 00:47:54.653-07
529b8e90-65c5-408b-9070-db5d1b84e69f	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:36:26.000Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": null, "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:41:14.998Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "e8db7610-dcb5-4660-8e0d-24992d1db142", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:41:15-07
c093debd-364c-4044-9918-dda328e0f424	00000000-0000-4000-8000-000000000001	UPDATE	MiningRegulationProcess	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	{"title": "Mining Licensing and Legislations", "publish": true, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-05-06T07:47:54.636Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-05-06T07:47:54.636Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	{"title": "Mining Licensing and Legislations", "publish": false, "createdAt": "2026-04-29T12:09:03.759Z", "deletedAt": null, "updatedAt": "2026-05-06T07:48:46.487Z", "created_at": "2026-04-29T12:09:03.759Z", "deleted_at": null, "updated_at": "2026-05-06T07:48:46.486Z", "description": "Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.", "mining_regulation_process_id": "6cfe5e47-76d0-483f-9e6f-58e00375c2ac"}	2026-05-06 00:48:46.488-07
54fa9c71-0f52-4182-ab1f-2cfb7a2f09a0	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:40:24.463Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 50}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:00:45.934Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 60}	2026-05-06 01:00:45.939-07
ca8a7a01-5e1e-40b2-b233-151522587f45	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:00:45.934Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 60}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:02:50.380Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 70}	2026-05-06 01:02:50.385-07
b8469a3a-f4aa-402d-915e-b591870a1a76	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:02:50.380Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 70}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:03:27.833Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 80}	2026-05-06 01:03:27.836-07
78b94e58-06b5-46a6-a913-2cefea86ba2b	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T07:35:24.567Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 50}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:07:34.293Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 60}	2026-05-06 01:07:34.297-07
ebde64eb-c368-45b4-844c-210910b99742	\N	CREATE	Message	686e9270-b2f7-413f-89b2-ff2f22ea839e	\N	{"message": "I want to get a license of exporting gemstone, and please can you email me the steps I should follow?  ", "subject": "license", "full_name": "Hawi Marga Kebede", "created_at": "2026-05-06T08:50:14.353Z", "deleted_at": null, "message_id": "686e9270-b2f7-413f-89b2-ff2f22ea839e", "updated_at": "2026-05-06T08:50:14.353Z", "email_address": "hawimerga13@gmail.com"}	2026-05-06 01:50:14.362-07
b32ff0ec-29cd-447a-94cb-72edbaf9b58e	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T06:47:31.225Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 30}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T10:59:11.092Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 40}	2026-05-06 03:59:11.097-07
f3303cda-450f-4733-b28e-920daf6ada91	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:03:27.833Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 80}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T11:25:54.450Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 90}	2026-05-06 04:25:54.454-07
394f9e38-e4a1-49a6-90ab-671048ef0e96	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T08:07:34.293Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 60}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T12:18:24.677Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 70}	2026-05-06 05:18:24.684-07
cfd9194f-2213-4b1a-962b-18d349c1e92b	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T12:18:24.677Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 70}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T12:26:39.168Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 80}	2026-05-06 05:26:39.171-07
80c5c99e-c4d8-4176-b7e8-d1f7c6ad8001	\N	CREATE	Message	94e8a975-3327-4805-be11-a99dc9e6bb62	\N	{"message": "I want training on the Golden Mountain, when is the training?", "subject": "Training ", "full_name": "Robera Uka Lemi", "created_at": "2026-05-06T17:49:42.726Z", "deleted_at": null, "message_id": "94e8a975-3327-4805-be11-a99dc9e6bb62", "updated_at": "2026-05-06T17:49:42.726Z", "email_address": "robinmy62@gmail.com"}	2026-05-06 10:49:42.735-07
11816fff-d4bd-4a68-a755-8a9925c0ee2f	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T11:25:54.450Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 90}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T11:07:19.497Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 100}	2026-05-07 04:07:19.501-07
b57a9d5c-322e-41a6-b6e1-e24a2a9abcee	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T11:07:19.497Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 100}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T11:43:13.776Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 110}	2026-05-07 04:43:13.783-07
31056c6e-f21b-4fc0-89a2-dae435f66f56	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:41:14.998Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "e8db7610-dcb5-4660-8e0d-24992d1db142", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:47:47.453Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "e8db7610-dcb5-4660-8e0d-24992d1db142", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:47:47.454-07
ab069d0f-6811-4224-ae21-e9017ff40e58	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T18:29:02.890Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 90}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T18:30:13.361Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 100}	2026-05-07 11:30:13.364-07
7da82c28-d4ca-48b9-a3d0-335237b41b94	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T11:43:13.776Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 110}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T06:14:05.930Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 120}	2026-05-07 23:14:05.933-07
cedf4fce-d81a-4a87-bdfa-21c6b1bd887e	\N	CREATE	Attachment	3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754	\N	{"file_name": "1778223874697-195116912_Opal.png", "file_path": "uploads/attachments/1778223874697-195116912_Opal.png", "created_at": "2026-05-08T07:04:34.702Z", "uploaded_by": null, "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754"}	2026-05-08 00:04:34.723-07
e970c442-62ce-4320-85e0-295f63b35e29	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	bf2d54c4-d21e-4a41-8b6b-6499522fba8f	\N	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:01.419Z", "deleted_at": null, "updated_at": "2026-05-08T07:05:01.419Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "bf2d54c4-d21e-4a41-8b6b-6499522fba8f", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:05:01.422-07
08a6e1fe-fda8-4464-b407-bd90280fce3a	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	\N	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:05:07.578Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:05:07.579-07
5e2fa8a2-c994-4120-be73-f45ba96c5427	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	38f2d23a-f291-4e3d-b837-43917118487d	\N	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:34.627Z", "deleted_at": null, "updated_at": "2026-05-08T07:05:34.627Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "38f2d23a-f291-4e3d-b837-43917118487d", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:05:34.629-07
efbbf9af-82ab-4592-8e5d-a95b171b03d5	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	38f2d23a-f291-4e3d-b837-43917118487d	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:34.627Z", "deleted_at": null, "updated_at": "2026-05-08T07:05:34.627Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "38f2d23a-f291-4e3d-b837-43917118487d", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:34.627Z", "deleted_at": "2026-05-08T07:06:10.578Z", "updated_at": "2026-05-08T07:05:34.627Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "38f2d23a-f291-4e3d-b837-43917118487d", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:06:10.579-07
82014b3e-26a6-475d-b0ce-6925ea3dd6dd	\N	CREATE	Attachment	e6a50da5-efae-4ee5-9d29-c150c960fe36	\N	{"file_name": "1778226810045-551491276_ethio-emerald.jpg", "file_path": "uploads/attachments/1778226810045-551491276_ethio-emerald.jpg", "created_at": "2026-05-08T07:53:30.048Z", "uploaded_by": null, "attachment_id": "e6a50da5-efae-4ee5-9d29-c150c960fe36"}	2026-05-08 00:53:30.073-07
fd77292a-a76a-4fc3-8926-1f4f947bc443	\N	CREATE	Attachment	b16c21da-462f-4ec8-81f4-b6de08f446c9	\N	{"file_name": "1778226852280-531088256_ethio-emerald.jpg", "file_path": "uploads/attachments/1778226852280-531088256_ethio-emerald.jpg", "created_at": "2026-05-08T07:54:12.282Z", "uploaded_by": null, "attachment_id": "b16c21da-462f-4ec8-81f4-b6de08f446c9"}	2026-05-08 00:54:12.302-07
4a41c6e2-4130-4d40-8eef-f457b6338a30	\N	CREATE	Attachment	512eae74-f0ee-46d8-9117-d89dee1d2b29	\N	{"file_name": "1778227051693-548210343_shakiso-emerald.jpg", "file_path": "uploads/attachments/1778227051693-548210343_shakiso-emerald.jpg", "created_at": "2026-05-08T07:57:31.695Z", "uploaded_by": null, "attachment_id": "512eae74-f0ee-46d8-9117-d89dee1d2b29"}	2026-05-08 00:57:31.721-07
b0f637af-803e-40bd-9289-fea1b262bf3b	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	bf2d54c4-d21e-4a41-8b6b-6499522fba8f	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:01.419Z", "deleted_at": null, "updated_at": "2026-05-08T07:05:01.419Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "bf2d54c4-d21e-4a41-8b6b-6499522fba8f", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:01.419Z", "deleted_at": "2026-05-08T07:06:12.770Z", "updated_at": "2026-05-08T07:05:01.419Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "bf2d54c4-d21e-4a41-8b6b-6499522fba8f", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:06:12.771-07
4247d30e-51ce-4cf7-89c6-6292aa519a5b	\N	CREATE	Attachment	87af5070-001e-463e-9db5-e5ab3d09d418	\N	{"file_name": "1778224450572-72544065_Opal.png", "file_path": "uploads/attachments/1778224450572-72544065_Opal.png", "created_at": "2026-05-08T07:14:10.578Z", "uploaded_by": null, "attachment_id": "87af5070-001e-463e-9db5-e5ab3d09d418"}	2026-05-08 00:14:10.605-07
e920ff85-f88c-48de-b829-2981bf66ae69	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Opal", "location": "Mezezo, Shewa Province", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:05:07.578Z", "description": "<p><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Properties:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">Applications:</strong><span style=\\"background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);\\">&nbsp;Gemstone.</span></p>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:14:22.440Z", "description": "<p>Ethiopian&nbsp;Opal&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of-color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3>Key&nbsp;Characteristics</h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3>Symbolism&nbsp;&amp;&nbsp;Meaning</h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3>Applications</h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:14:22.443-07
1df4a0e6-6df9-482a-9052-2044178a8c84	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:14:22.440Z", "description": "<p>Ethiopian&nbsp;Opal&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of-color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3>Key&nbsp;Characteristics</h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3>Symbolism&nbsp;&amp;&nbsp;Meaning</h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3>Applications</h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:14:26.290Z", "description": "<p>Ethiopian&nbsp;Opal&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of-color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3>Key&nbsp;Characteristics</h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3>Symbolism&nbsp;&amp;&nbsp;Meaning</h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3>Applications</h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:14:26.291-07
1b5d85a2-5779-4713-89e4-a53ce4359e51	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:14:26.290Z", "description": "<p>Ethiopian&nbsp;Opal&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of-color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3>Key&nbsp;Characteristics</h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3>Symbolism&nbsp;&amp;&nbsp;Meaning</h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3>Applications</h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:15:51.256Z", "description": "<p><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:15:51.258-07
5991c627-5c1f-43cb-a387-7ee9c6da356c	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	9ae73d62-12c7-4ec2-b2ae-0fd054c4c180	\N	{"title": "Welo Opal", "location": "Northern Ethiopia, Wollo Province", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:16:00.241Z", "deleted_at": null, "updated_at": "2026-05-08T07:16:00.241Z", "description": "<p>Welo&nbsp;Opals,&nbsp;discovered&nbsp;in&nbsp;northern&nbsp;Ethiopia’s&nbsp;Wollo&nbsp;Province,&nbsp;are&nbsp;among&nbsp;the&nbsp;most&nbsp;famous&nbsp;Ethiopian&nbsp;gemstones.&nbsp;These&nbsp;opals&nbsp;are&nbsp;prized&nbsp;for&nbsp;their&nbsp;intense&nbsp;brightness,&nbsp;vivid&nbsp;rainbow-like&nbsp;color&nbsp;flashes,&nbsp;and&nbsp;superior&nbsp;durability&nbsp;compared&nbsp;to&nbsp;earlier&nbsp;Ethiopian&nbsp;opals.&nbsp;Welo&nbsp;opals&nbsp;commonly&nbsp;occur&nbsp;as&nbsp;white,&nbsp;crystal,&nbsp;or&nbsp;fire&nbsp;opals&nbsp;and&nbsp;are&nbsp;highly&nbsp;sought&nbsp;after&nbsp;in&nbsp;international&nbsp;jewelry&nbsp;markets.</p><p><strong>Known&nbsp;For:</strong>&nbsp;Brilliant&nbsp;color&nbsp;play,&nbsp;transparency,&nbsp;durability.</p><p>&nbsp;<strong>Applications:</strong>&nbsp;Rings,&nbsp;necklaces,&nbsp;pendants,&nbsp;luxury&nbsp;jewelry.</p>", "gamestone_id": "9ae73d62-12c7-4ec2-b2ae-0fd054c4c180", "attachment_id": "87af5070-001e-463e-9db5-e5ab3d09d418", "discovered_date": "1980-07-08T00:00:00.000Z"}	2026-05-08 00:16:00.243-07
7506f182-438f-4d56-ba83-18d00f591cf7	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:15:51.256Z", "description": "<p><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:17:12.064Z", "description": "<p><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:17:12.065-07
a724308a-baa1-4245-aba0-0090a194ba6b	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:17:12.064Z", "description": "<p><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:17:38.050Z", "description": "<p><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;</p><p>display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:17:38.052-07
f16d0f37-2680-4a2a-b4ce-c098f38cde62	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:17:38.050Z", "description": "<p><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;</p><p>display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p>Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p>The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p>Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p>Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:18:24.993Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:18:24.994-07
2f507f74-a0e2-458a-9a15-8b810502d315	\N	CREATE	Attachment	aea0f70b-fd0c-451f-8f00-5ea378c653fe	\N	{"file_name": "1778224902822-565540848_Fire_opal.jpg", "file_path": "uploads/attachments/1778224902822-565540848_Fire_opal.jpg", "created_at": "2026-05-08T07:21:42.824Z", "uploaded_by": null, "attachment_id": "aea0f70b-fd0c-451f-8f00-5ea378c653fe"}	2026-05-08 00:21:42.847-07
782438b6-11ec-4d43-a0d7-e4772a633dba	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	dc7983ad-d122-437a-b95d-f9053113eacf	\N	{"title": "Fire Opal", "location": " Wollo and Shewa regions", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:22:20.927Z", "deleted_at": null, "updated_at": "2026-05-08T07:22:20.927Z", "description": "<p>Ethiopian&nbsp;Fire&nbsp;Opals&nbsp;are&nbsp;translucent&nbsp;gemstones&nbsp;with&nbsp;warm&nbsp;body&nbsp;colors&nbsp;ranging&nbsp;from&nbsp;yellow&nbsp;and&nbsp;orange&nbsp;to&nbsp;deep&nbsp;red.&nbsp;Combined&nbsp;with&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;green,&nbsp;purple,&nbsp;and&nbsp;blue,&nbsp;these&nbsp;opals&nbsp;symbolize&nbsp;passion,&nbsp;energy,&nbsp;and&nbsp;emotional&nbsp;strength.</p><p><strong>Properties:</strong>&nbsp;Warm&nbsp;fiery&nbsp;tones,&nbsp;luminous&nbsp;transparency,&nbsp;energetic&nbsp;symbolism.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;collector&nbsp;gemstones,&nbsp;spiritual&nbsp;accessories.</p>", "gamestone_id": "dc7983ad-d122-437a-b95d-f9053113eacf", "attachment_id": "aea0f70b-fd0c-451f-8f00-5ea378c653fe", "discovered_date": "1980-02-08T00:00:00.000Z"}	2026-05-08 00:22:20.93-07
cbb11d2d-7d74-4d3b-a9a6-27e2357fcb7c	\N	CREATE	Attachment	e5cf84cd-195c-4e05-b99a-701f3388a5d7	\N	{"file_name": "1778225022375-786134919_wello_opal.jpg", "file_path": "uploads/attachments/1778225022375-786134919_wello_opal.jpg", "created_at": "2026-05-08T07:23:42.377Z", "uploaded_by": null, "attachment_id": "e5cf84cd-195c-4e05-b99a-701f3388a5d7"}	2026-05-08 00:23:42.395-07
2a906b5a-8f8d-4ba0-b21a-8096bd7a359a	\N	DELETE	Attachment	87af5070-001e-463e-9db5-e5ab3d09d418	{"file_name": "1778224450572-72544065_Opal.png", "file_path": "uploads/attachments/1778224450572-72544065_Opal.png", "created_at": "2026-05-08T07:14:10.578Z", "uploaded_by": null, "attachment_id": "87af5070-001e-463e-9db5-e5ab3d09d418"}	\N	2026-05-08 00:23:42.465-07
b53cffac-c2a4-4d73-961d-e315be2d6e90	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	4aaeffb6-de37-4bb3-aec3-713784ff44e5	\N	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:54:49.757Z", "deleted_at": null, "updated_at": "2026-05-08T07:54:49.757Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul><p></p>", "gamestone_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "attachment_id": "b16c21da-462f-4ec8-81f4-b6de08f446c9", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 00:54:49.76-07
937c5ab9-9006-47b0-8492-f82683c97ead	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	9ae73d62-12c7-4ec2-b2ae-0fd054c4c180	{"title": "Welo Opal", "location": "Northern Ethiopia, Wollo Province", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:16:00.241Z", "deleted_at": null, "updated_at": "2026-05-08T07:16:00.241Z", "description": "<p>Welo&nbsp;Opals,&nbsp;discovered&nbsp;in&nbsp;northern&nbsp;Ethiopia’s&nbsp;Wollo&nbsp;Province,&nbsp;are&nbsp;among&nbsp;the&nbsp;most&nbsp;famous&nbsp;Ethiopian&nbsp;gemstones.&nbsp;These&nbsp;opals&nbsp;are&nbsp;prized&nbsp;for&nbsp;their&nbsp;intense&nbsp;brightness,&nbsp;vivid&nbsp;rainbow-like&nbsp;color&nbsp;flashes,&nbsp;and&nbsp;superior&nbsp;durability&nbsp;compared&nbsp;to&nbsp;earlier&nbsp;Ethiopian&nbsp;opals.&nbsp;Welo&nbsp;opals&nbsp;commonly&nbsp;occur&nbsp;as&nbsp;white,&nbsp;crystal,&nbsp;or&nbsp;fire&nbsp;opals&nbsp;and&nbsp;are&nbsp;highly&nbsp;sought&nbsp;after&nbsp;in&nbsp;international&nbsp;jewelry&nbsp;markets.</p><p><strong>Known&nbsp;For:</strong>&nbsp;Brilliant&nbsp;color&nbsp;play,&nbsp;transparency,&nbsp;durability.</p><p>&nbsp;<strong>Applications:</strong>&nbsp;Rings,&nbsp;necklaces,&nbsp;pendants,&nbsp;luxury&nbsp;jewelry.</p>", "gamestone_id": "9ae73d62-12c7-4ec2-b2ae-0fd054c4c180", "attachment_id": null, "discovered_date": "1980-07-08T00:00:00.000Z"}	{"title": "Welo Opal", "location": "Northern Ethiopia, Wollo Province", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:16:00.241Z", "deleted_at": null, "updated_at": "2026-05-08T07:23:48.380Z", "description": "<p>Welo&nbsp;Opals,&nbsp;discovered&nbsp;in&nbsp;northern&nbsp;Ethiopia’s&nbsp;Wollo&nbsp;Province,&nbsp;are&nbsp;among&nbsp;the&nbsp;most&nbsp;famous&nbsp;Ethiopian&nbsp;gemstones.&nbsp;These&nbsp;opals&nbsp;are&nbsp;prized&nbsp;for&nbsp;their&nbsp;intense&nbsp;brightness,&nbsp;vivid&nbsp;rainbow-like&nbsp;color&nbsp;flashes,&nbsp;and&nbsp;superior&nbsp;durability&nbsp;compared&nbsp;to&nbsp;earlier&nbsp;Ethiopian&nbsp;opals.&nbsp;Welo&nbsp;opals&nbsp;commonly&nbsp;occur&nbsp;as&nbsp;white,&nbsp;crystal,&nbsp;or&nbsp;fire&nbsp;opals&nbsp;and&nbsp;are&nbsp;highly&nbsp;sought&nbsp;after&nbsp;in&nbsp;international&nbsp;jewelry&nbsp;markets.</p><p><strong>Known&nbsp;For:</strong>&nbsp;Brilliant&nbsp;color&nbsp;play,&nbsp;transparency,&nbsp;durability.</p><p>&nbsp;<strong>Applications:</strong>&nbsp;Rings,&nbsp;necklaces,&nbsp;pendants,&nbsp;luxury&nbsp;jewelry.</p>", "gamestone_id": "9ae73d62-12c7-4ec2-b2ae-0fd054c4c180", "attachment_id": "e5cf84cd-195c-4e05-b99a-701f3388a5d7", "discovered_date": "1980-07-08T00:00:00.000Z"}	2026-05-08 00:23:48.381-07
40839882-9c26-4e28-ad55-0bdbf78bd320	\N	CREATE	Attachment	5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0	\N	{"file_name": "1778225236289-133460761_black_opal.jpg", "file_path": "uploads/attachments/1778225236289-133460761_black_opal.jpg", "created_at": "2026-05-08T07:27:16.291Z", "uploaded_by": null, "attachment_id": "5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0"}	2026-05-08 00:27:16.315-07
7d925583-3071-4540-82d8-0bfcd266f5b6	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	db5d6901-5cb3-40be-a42b-834e52c8be44	\N	{"title": "Black Opal", "location": " Northern highlands of Ethiopia", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:27:21.432Z", "deleted_at": null, "updated_at": "2026-05-08T07:27:21.432Z", "description": "<p>Among&nbsp;the&nbsp;rarest&nbsp;Ethiopian&nbsp;opals,&nbsp;Black&nbsp;Opals&nbsp;feature&nbsp;dark&nbsp;gray&nbsp;to&nbsp;black&nbsp;body&nbsp;tones&nbsp;that&nbsp;dramatically&nbsp;enhance&nbsp;the&nbsp;gemstone’s&nbsp;colorful&nbsp;flashes.&nbsp;These&nbsp;stones&nbsp;are&nbsp;highly&nbsp;valuable&nbsp;due&nbsp;to&nbsp;their&nbsp;rarity&nbsp;and&nbsp;striking&nbsp;contrast.</p><p><strong>Properties:</strong>&nbsp;Dark&nbsp;body&nbsp;tone,&nbsp;vivid&nbsp;spectral&nbsp;flashes,&nbsp;rarity.</p><p><strong>Applications:</strong>&nbsp;High-end&nbsp;jewelry,&nbsp;gemstone&nbsp;investment,&nbsp;premium&nbsp;collections.</p>", "gamestone_id": "db5d6901-5cb3-40be-a42b-834e52c8be44", "attachment_id": "5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0", "discovered_date": "2013-07-11T00:00:00.000Z"}	2026-05-08 00:27:21.434-07
dcc6b969-03d1-47e9-bdf6-e7f7d0bd3894	\N	CREATE	Attachment	febdd5e9-b64d-461a-a2ce-bf78cdf993a2	\N	{"file_name": "1778225481304-625481919_mezezo_opal.jpg", "file_path": "uploads/attachments/1778225481304-625481919_mezezo_opal.jpg", "created_at": "2026-05-08T07:31:21.307Z", "uploaded_by": null, "attachment_id": "febdd5e9-b64d-461a-a2ce-bf78cdf993a2"}	2026-05-08 00:31:21.329-07
266ae548-837f-4314-9c52-86d0cefbfd73	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	0ec3ca68-31ab-4851-8954-4179bc28da3b	\N	{"title": "Mezezo Opal", "location": " North Shewa", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:31:25.953Z", "deleted_at": null, "updated_at": "2026-05-08T07:31:25.953Z", "description": "<p>Mezezo&nbsp;Opals&nbsp;were&nbsp;the&nbsp;first&nbsp;Ethiopian&nbsp;opals&nbsp;discovered&nbsp;commercially&nbsp;in&nbsp;1994.&nbsp;Known&nbsp;for&nbsp;their&nbsp;reddish-brown,&nbsp;orange,&nbsp;and&nbsp;chocolate-colored&nbsp;body&nbsp;tones,&nbsp;these&nbsp;opals&nbsp;possess&nbsp;a&nbsp;unique&nbsp;earthy&nbsp;beauty&nbsp;and&nbsp;historical&nbsp;significance&nbsp;within&nbsp;Ethiopia’s&nbsp;gemstone&nbsp;industry.</p><p><strong>Properties:</strong>&nbsp;Chocolate-brown&nbsp;tones,&nbsp;volcanic&nbsp;origin,&nbsp;natural&nbsp;uniqueness.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;collectors’&nbsp;stones,&nbsp;cultural&nbsp;gemstone&nbsp;trade.</p>", "gamestone_id": "0ec3ca68-31ab-4851-8954-4179bc28da3b", "attachment_id": "febdd5e9-b64d-461a-a2ce-bf78cdf993a2", "discovered_date": "1994-06-08T00:00:00.000Z"}	2026-05-08 00:31:25.956-07
8beff406-4678-4762-954e-00a887fa2016	\N	CREATE	Attachment	b5fba326-d867-4c35-b1ac-730015e64178	\N	{"file_name": "1778225705431-590593055_white_opal.jpg", "file_path": "uploads/attachments/1778225705431-590593055_white_opal.jpg", "created_at": "2026-05-08T07:35:05.433Z", "uploaded_by": null, "attachment_id": "b5fba326-d867-4c35-b1ac-730015e64178"}	2026-05-08 00:35:05.438-07
6904e423-5c89-4a5b-b8f2-3a74d2554a69	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	3a695bc7-5061-4337-ad9b-68c07c24bd9f	\N	{"title": "White Precious Opal", "location": "Amhara Regional State, (Wegel Tena)", "parent_id": "17ead0c5-b626-42a4-8402-a10589425829", "created_at": "2026-05-08T07:35:10.581Z", "deleted_at": null, "updated_at": "2026-05-08T07:35:10.581Z", "description": "<p>White&nbsp;Precious&nbsp;Opals&nbsp;are&nbsp;bright&nbsp;Ethiopian&nbsp;opals&nbsp;with&nbsp;white&nbsp;or&nbsp;milky&nbsp;body&nbsp;colors&nbsp;and&nbsp;exceptional&nbsp;rainbow&nbsp;flashes.&nbsp;They&nbsp;are&nbsp;considered&nbsp;among&nbsp;the&nbsp;most&nbsp;stable&nbsp;and&nbsp;visually&nbsp;vibrant&nbsp;Ethiopian&nbsp;opals.</p><p><strong>Properties:</strong>&nbsp;Bright&nbsp;white&nbsp;body&nbsp;tone,&nbsp;high&nbsp;brilliance,&nbsp;strong&nbsp;color&nbsp;play.</p><p><strong>Applications:</strong>&nbsp;Fine&nbsp;jewelry,&nbsp;gemstone&nbsp;exhibitions,&nbsp;luxury&nbsp;accessories.</p>", "gamestone_id": "3a695bc7-5061-4337-ad9b-68c07c24bd9f", "attachment_id": "b5fba326-d867-4c35-b1ac-730015e64178", "discovered_date": "2008-06-08T00:00:00.000Z"}	2026-05-08 00:35:10.583-07
8bc1fa1e-a57e-4082-bd4f-3f0d7ef8500f	\N	CREATE	Attachment	02d8026a-ce0b-4e40-8c8c-792574ca848a	\N	{"file_name": "1778225781937-502942722_ethiopian-opal-pattern-chart.jpg", "file_path": "uploads/attachments/1778225781937-502942722_ethiopian-opal-pattern-chart.jpg", "created_at": "2026-05-08T07:36:21.939Z", "uploaded_by": null, "attachment_id": "02d8026a-ce0b-4e40-8c8c-792574ca848a"}	2026-05-08 00:36:21.964-07
06809f2d-ad80-4a6c-877f-65320d4e6520	\N	DELETE	Attachment	3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754	{"file_name": "1778223874697-195116912_Opal.png", "file_path": "uploads/attachments/1778223874697-195116912_Opal.png", "created_at": "2026-05-08T07:04:34.702Z", "uploaded_by": null, "attachment_id": "3f19c1ee-dd2a-4afd-8ca7-85dd1f17f754"}	\N	2026-05-08 00:36:22.057-07
bd66abb5-275f-4f73-bbcc-a33707502e71	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	17ead0c5-b626-42a4-8402-a10589425829	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:18:24.993Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": null, "discovered_date": "1998-06-08T00:00:00.000Z"}	{"title": "Ethiopian Opal", "location": "Mezezo & Wollo Regions, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:05:07.578Z", "deleted_at": null, "updated_at": "2026-05-08T07:36:26.000Z", "description": "<p class=\\"ql-align-justify\\"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class=\\"ql-align-justify\\">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class=\\"ql-align-justify\\">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class=\\"ql-align-justify\\">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class=\\"ql-align-justify\\">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>", "gamestone_id": "17ead0c5-b626-42a4-8402-a10589425829", "attachment_id": "02d8026a-ce0b-4e40-8c8c-792574ca848a", "discovered_date": "1998-06-08T00:00:00.000Z"}	2026-05-08 00:36:26.001-07
da7dd04e-6e06-4843-bf16-0c351b1d2aee	\N	CREATE	Attachment	e8db7610-dcb5-4660-8e0d-24992d1db142	\N	{"file_name": "1778226072038-255009379_opals.jpg", "file_path": "uploads/attachments/1778226072038-255009379_opals.jpg", "created_at": "2026-05-08T07:41:12.041Z", "uploaded_by": null, "attachment_id": "e8db7610-dcb5-4660-8e0d-24992d1db142"}	2026-05-08 00:41:12.064-07
98e66d65-f28c-48dc-ab27-34115059139a	\N	DELETE	Attachment	02d8026a-ce0b-4e40-8c8c-792574ca848a	{"file_name": "1778225781937-502942722_ethiopian-opal-pattern-chart.jpg", "file_path": "uploads/attachments/1778225781937-502942722_ethiopian-opal-pattern-chart.jpg", "created_at": "2026-05-08T07:36:21.939Z", "uploaded_by": null, "attachment_id": "02d8026a-ce0b-4e40-8c8c-792574ca848a"}	\N	2026-05-08 00:41:12.14-07
3cd73e48-5c34-4d2f-9fce-17168d69ac80	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	ac8357d7-48b8-4668-ae8a-ac984fd5238d	\N	{"title": "Shakiso Emerald", "location": "Shakiso, Ethiopia", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T07:58:16.277Z", "deleted_at": null, "updated_at": "2026-05-08T07:58:16.277Z", "description": "<p>Shakiso&nbsp;Emeralds&nbsp;are&nbsp;the&nbsp;most&nbsp;recognized&nbsp;Ethiopian&nbsp;emeralds,&nbsp;discovered&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;of&nbsp;Oromia.&nbsp;These&nbsp;gemstones&nbsp;are&nbsp;admired&nbsp;for&nbsp;their&nbsp;vivid&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;coloration,&nbsp;strong&nbsp;saturation,&nbsp;and&nbsp;exceptional&nbsp;brilliance.&nbsp;Many&nbsp;Shakiso&nbsp;emeralds&nbsp;possess&nbsp;a&nbsp;glowing&nbsp;appearance&nbsp;that&nbsp;makes&nbsp;them&nbsp;highly&nbsp;desirable&nbsp;in&nbsp;luxury&nbsp;jewelry&nbsp;markets.&nbsp;The&nbsp;region&nbsp;produces&nbsp;both&nbsp;commercial-grade&nbsp;and&nbsp;fine&nbsp;gem-quality&nbsp;emeralds,&nbsp;with&nbsp;some&nbsp;stones&nbsp;requiring&nbsp;little&nbsp;to&nbsp;no&nbsp;enhancement.</p><p><strong>Known&nbsp;For:</strong>&nbsp;Electric-green&nbsp;color,&nbsp;strong&nbsp;saturation,&nbsp;gem-quality&nbsp;clarity.</p><p><strong>Applications:</strong>&nbsp;Rings,&nbsp;pendants,&nbsp;necklaces,&nbsp;luxury&nbsp;gemstone&nbsp;jewelry.</p>", "gamestone_id": "ac8357d7-48b8-4668-ae8a-ac984fd5238d", "attachment_id": "512eae74-f0ee-46d8-9117-d89dee1d2b29", "discovered_date": "2016-11-23T00:00:00.000Z"}	2026-05-08 00:58:16.279-07
360663ee-e02d-4fd4-829c-53c589f5c35b	\N	CREATE	Attachment	115491eb-abf0-4ba1-a1e2-5a7ee8debaf2	\N	{"file_name": "1778227262056-40934564_kenticha-emerald.jpg", "file_path": "uploads/attachments/1778227262056-40934564_kenticha-emerald.jpg", "created_at": "2026-05-08T08:01:02.058Z", "uploaded_by": null, "attachment_id": "115491eb-abf0-4ba1-a1e2-5a7ee8debaf2"}	2026-05-08 01:01:02.063-07
6737fc6b-a814-47a7-a2aa-7c9e06189fb0	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	8b0bcfe4-036c-4f2e-81ca-b4a2480f24eb	\N	{"title": "Kenticha Emerald", "location": "Southern Ethiopia, Kenticha ", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:01:07.676Z", "deleted_at": null, "updated_at": "2026-05-08T08:01:07.676Z", "description": "<p>Kenticha&nbsp;Emeralds&nbsp;originate&nbsp;from&nbsp;the&nbsp;Kenticha&nbsp;mining&nbsp;area&nbsp;in&nbsp;southern&nbsp;Ethiopia&nbsp;and&nbsp;are&nbsp;known&nbsp;for&nbsp;their&nbsp;naturally&nbsp;rich&nbsp;green&nbsp;appearance&nbsp;and&nbsp;large&nbsp;crystal&nbsp;formations.&nbsp;These&nbsp;emeralds&nbsp;often&nbsp;contain&nbsp;natural&nbsp;mineral&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite,&nbsp;giving&nbsp;each&nbsp;stone&nbsp;a&nbsp;distinctive&nbsp;internal&nbsp;character.&nbsp;Kenticha&nbsp;emeralds&nbsp;have&nbsp;become&nbsp;increasingly&nbsp;important&nbsp;in&nbsp;Ethiopia’s&nbsp;growing&nbsp;gemstone&nbsp;export&nbsp;industry.</p><p><strong>Properties:</strong>&nbsp;Natural&nbsp;inclusions,&nbsp;deep&nbsp;green&nbsp;tones,&nbsp;large&nbsp;rough&nbsp;crystals.</p><p><strong>Applications:</strong>&nbsp;Fine&nbsp;jewelry,&nbsp;gemstone&nbsp;cutting,&nbsp;collectors’&nbsp;stones.</p>", "gamestone_id": "8b0bcfe4-036c-4f2e-81ca-b4a2480f24eb", "attachment_id": "115491eb-abf0-4ba1-a1e2-5a7ee8debaf2", "discovered_date": "2016-06-30T00:00:00.000Z"}	2026-05-08 01:01:07.679-07
0aa35097-c11f-4eea-9de8-2cad6b3fcd49	\N	CREATE	Attachment	da39ee50-d9ee-4672-8a46-233854921a94	\N	{"file_name": "1778227500380-490653513_dermi-eremald.jpg", "file_path": "uploads/attachments/1778227500380-490653513_dermi-eremald.jpg", "created_at": "2026-05-08T08:05:00.381Z", "uploaded_by": null, "attachment_id": "da39ee50-d9ee-4672-8a46-233854921a94"}	2026-05-08 01:05:00.384-07
2261efdf-81af-4b32-b93e-f5a7c5dc2c69	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	30682cc5-1f9b-4566-9bcc-232f2982ea2d	\N	{"title": "Dermi Emerald", "location": "Southern Oromia Region, Ethiopia", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:05:06.631Z", "deleted_at": null, "updated_at": "2026-05-08T08:05:06.631Z", "description": "<p>Dermi&nbsp;Emeralds&nbsp;are&nbsp;mined&nbsp;from&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district&nbsp;and&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;bright&nbsp;coloration&nbsp;and&nbsp;transparent&nbsp;crystal&nbsp;quality.&nbsp;These&nbsp;stones&nbsp;are&nbsp;commonly&nbsp;associated&nbsp;with&nbsp;Ethiopia’s&nbsp;newer&nbsp;emerald&nbsp;discoveries&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;the&nbsp;country’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;emerging&nbsp;gemstone&nbsp;source.&nbsp;High-quality&nbsp;Dermi&nbsp;emeralds&nbsp;can&nbsp;display&nbsp;excellent&nbsp;brilliance&nbsp;and&nbsp;vivid&nbsp;green&nbsp;tones.</p><p><strong>Properties:</strong>&nbsp;Bright&nbsp;green&nbsp;color,&nbsp;transparency,&nbsp;natural&nbsp;brilliance.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;gemstone&nbsp;investment,&nbsp;premium&nbsp;collections.</p>", "gamestone_id": "30682cc5-1f9b-4566-9bcc-232f2982ea2d", "attachment_id": "da39ee50-d9ee-4672-8a46-233854921a94", "discovered_date": "2017-03-15T00:00:00.000Z"}	2026-05-08 01:05:06.635-07
759acaa0-f2f6-4c50-9af6-7deec6e6f466	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	8b0bcfe4-036c-4f2e-81ca-b4a2480f24eb	{"title": "Kenticha Emerald", "location": "Southern Ethiopia, Kenticha ", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:01:07.676Z", "deleted_at": null, "updated_at": "2026-05-08T08:01:07.676Z", "description": "<p>Kenticha&nbsp;Emeralds&nbsp;originate&nbsp;from&nbsp;the&nbsp;Kenticha&nbsp;mining&nbsp;area&nbsp;in&nbsp;southern&nbsp;Ethiopia&nbsp;and&nbsp;are&nbsp;known&nbsp;for&nbsp;their&nbsp;naturally&nbsp;rich&nbsp;green&nbsp;appearance&nbsp;and&nbsp;large&nbsp;crystal&nbsp;formations.&nbsp;These&nbsp;emeralds&nbsp;often&nbsp;contain&nbsp;natural&nbsp;mineral&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite,&nbsp;giving&nbsp;each&nbsp;stone&nbsp;a&nbsp;distinctive&nbsp;internal&nbsp;character.&nbsp;Kenticha&nbsp;emeralds&nbsp;have&nbsp;become&nbsp;increasingly&nbsp;important&nbsp;in&nbsp;Ethiopia’s&nbsp;growing&nbsp;gemstone&nbsp;export&nbsp;industry.</p><p><strong>Properties:</strong>&nbsp;Natural&nbsp;inclusions,&nbsp;deep&nbsp;green&nbsp;tones,&nbsp;large&nbsp;rough&nbsp;crystals.</p><p><strong>Applications:</strong>&nbsp;Fine&nbsp;jewelry,&nbsp;gemstone&nbsp;cutting,&nbsp;collectors’&nbsp;stones.</p>", "gamestone_id": "8b0bcfe4-036c-4f2e-81ca-b4a2480f24eb", "attachment_id": "115491eb-abf0-4ba1-a1e2-5a7ee8debaf2", "discovered_date": "2016-06-30T00:00:00.000Z"}	{"title": "Kenticha Emerald", "location": "Southern Ethiopia, Kenticha ", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:01:07.676Z", "deleted_at": null, "updated_at": "2026-05-08T08:05:28.208Z", "description": "<p>Kenticha&nbsp;Emeralds&nbsp;originate&nbsp;from&nbsp;the&nbsp;Kenticha&nbsp;mining&nbsp;area&nbsp;in&nbsp;southern&nbsp;Ethiopia&nbsp;and&nbsp;are&nbsp;known&nbsp;for&nbsp;their&nbsp;naturally&nbsp;rich&nbsp;green&nbsp;appearance&nbsp;and&nbsp;large&nbsp;crystal&nbsp;formations.&nbsp;These&nbsp;emeralds&nbsp;often&nbsp;contain&nbsp;natural&nbsp;mineral&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite,&nbsp;giving&nbsp;each&nbsp;stone&nbsp;a&nbsp;distinctive&nbsp;internal&nbsp;character.&nbsp;Kenticha&nbsp;emeralds&nbsp;have&nbsp;become&nbsp;increasingly&nbsp;important&nbsp;in&nbsp;Ethiopia’s&nbsp;growing&nbsp;gemstone&nbsp;export&nbsp;industry.</p><p><strong>Properties:</strong>&nbsp;Natural&nbsp;inclusions,&nbsp;deep&nbsp;green&nbsp;tones,&nbsp;large&nbsp;rough&nbsp;crystals.</p><p><strong>Applications:</strong>&nbsp;Fine&nbsp;jewelry,&nbsp;gemstone&nbsp;cutting,&nbsp;collectors’&nbsp;stones.</p>", "gamestone_id": "8b0bcfe4-036c-4f2e-81ca-b4a2480f24eb", "attachment_id": "115491eb-abf0-4ba1-a1e2-5a7ee8debaf2", "discovered_date": "2016-06-30T00:00:00.000Z"}	2026-05-08 01:05:28.21-07
8c098cd4-1b32-4346-903a-e7c951cc229b	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T13:42:31.664Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 130}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T14:11:16.780Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 140}	2026-05-08 07:11:16.784-07
a194ad18-b33e-4f58-8a1c-8262714e2ef9	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T12:44:22.918Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 120}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T15:32:13.176Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 130}	2026-05-08 08:32:13.181-07
a8b303b0-72b7-43fc-99f3-b29f237b5e35	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	30682cc5-1f9b-4566-9bcc-232f2982ea2d	{"title": "Dermi Emerald", "location": "Southern Oromia Region, Ethiopia", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:05:06.631Z", "deleted_at": null, "updated_at": "2026-05-08T08:05:06.631Z", "description": "<p>Dermi&nbsp;Emeralds&nbsp;are&nbsp;mined&nbsp;from&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district&nbsp;and&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;bright&nbsp;coloration&nbsp;and&nbsp;transparent&nbsp;crystal&nbsp;quality.&nbsp;These&nbsp;stones&nbsp;are&nbsp;commonly&nbsp;associated&nbsp;with&nbsp;Ethiopia’s&nbsp;newer&nbsp;emerald&nbsp;discoveries&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;the&nbsp;country’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;emerging&nbsp;gemstone&nbsp;source.&nbsp;High-quality&nbsp;Dermi&nbsp;emeralds&nbsp;can&nbsp;display&nbsp;excellent&nbsp;brilliance&nbsp;and&nbsp;vivid&nbsp;green&nbsp;tones.</p><p><strong>Properties:</strong>&nbsp;Bright&nbsp;green&nbsp;color,&nbsp;transparency,&nbsp;natural&nbsp;brilliance.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;gemstone&nbsp;investment,&nbsp;premium&nbsp;collections.</p>", "gamestone_id": "30682cc5-1f9b-4566-9bcc-232f2982ea2d", "attachment_id": "da39ee50-d9ee-4672-8a46-233854921a94", "discovered_date": "2017-03-15T00:00:00.000Z"}	{"title": "Dermi Emerald", "location": "Southern Ethiopia, Dermi", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:05:06.631Z", "deleted_at": null, "updated_at": "2026-05-08T08:05:55.550Z", "description": "<p>Dermi&nbsp;Emeralds&nbsp;are&nbsp;mined&nbsp;from&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district&nbsp;and&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;bright&nbsp;coloration&nbsp;and&nbsp;transparent&nbsp;crystal&nbsp;quality.&nbsp;These&nbsp;stones&nbsp;are&nbsp;commonly&nbsp;associated&nbsp;with&nbsp;Ethiopia’s&nbsp;newer&nbsp;emerald&nbsp;discoveries&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;the&nbsp;country’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;emerging&nbsp;gemstone&nbsp;source.&nbsp;High-quality&nbsp;Dermi&nbsp;emeralds&nbsp;can&nbsp;display&nbsp;excellent&nbsp;brilliance&nbsp;and&nbsp;vivid&nbsp;green&nbsp;tones.</p><p><strong>Properties:</strong>&nbsp;Bright&nbsp;green&nbsp;color,&nbsp;transparency,&nbsp;natural&nbsp;brilliance.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;gemstone&nbsp;investment,&nbsp;premium&nbsp;collections.</p>", "gamestone_id": "30682cc5-1f9b-4566-9bcc-232f2982ea2d", "attachment_id": "da39ee50-d9ee-4672-8a46-233854921a94", "discovered_date": "2017-03-15T00:00:00.000Z"}	2026-05-08 01:05:55.552-07
bca99ca7-9fb4-4ce5-9e86-cb0395cb3e5e	\N	CREATE	Attachment	a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8	\N	{"file_name": "1778227913363-64992621_Beryl-Emerald.jpg", "file_path": "uploads/attachments/1778227913363-64992621_Beryl-Emerald.jpg", "created_at": "2026-05-08T08:11:53.366Z", "uploaded_by": null, "attachment_id": "a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8"}	2026-05-08 01:11:53.387-07
85c9e0bb-9fc7-479a-b2fc-108bef485096	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	50c7f91a-1817-49ff-a496-adf315d94f6a	\N	{"title": "Hydrothermal Emerald", "location": "Oromia Region", "parent_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "created_at": "2026-05-08T08:11:55.730Z", "deleted_at": null, "updated_at": "2026-05-08T08:11:55.730Z", "description": "<p>Hydrothermal&nbsp;Ethiopian&nbsp;Emeralds&nbsp;form&nbsp;through&nbsp;mineral-rich&nbsp;fluids&nbsp;moving&nbsp;through&nbsp;schist&nbsp;host&nbsp;rocks&nbsp;deep&nbsp;underground.&nbsp;These&nbsp;emeralds&nbsp;are&nbsp;naturally&nbsp;created&nbsp;over&nbsp;millions&nbsp;of&nbsp;years&nbsp;through&nbsp;geological&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;Their&nbsp;formation&nbsp;process&nbsp;contributes&nbsp;to&nbsp;their&nbsp;vivid&nbsp;color&nbsp;and&nbsp;unique&nbsp;mineral&nbsp;composition.</p><p><strong>Properties:</strong>&nbsp;Hydrothermal&nbsp;formation,&nbsp;schist-hosted&nbsp;structure,&nbsp;rich&nbsp;mineral&nbsp;composition.</p><p><strong>Applications:</strong>&nbsp;Gemstone&nbsp;collections,&nbsp;scientific&nbsp;studies,&nbsp;luxury&nbsp;jewelry.</p>", "gamestone_id": "50c7f91a-1817-49ff-a496-adf315d94f6a", "attachment_id": "a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8", "discovered_date": "2016-10-08T00:00:00.000Z"}	2026-05-08 01:11:55.733-07
cd6b311b-181d-42cb-a7a3-ce6ba7d1f471	\N	CREATE	Attachment	91660636-e7be-4e67-b8c4-b7aa6ec7ca42	\N	{"file_name": "1778228044410-798625430_Ethiopian-emerald.jpg", "file_path": "uploads/attachments/1778228044410-798625430_Ethiopian-emerald.jpg", "created_at": "2026-05-08T08:14:04.412Z", "uploaded_by": null, "attachment_id": "91660636-e7be-4e67-b8c4-b7aa6ec7ca42"}	2026-05-08 01:14:04.417-07
c5c91a09-19fc-4a98-a9d3-b34043fbc3f6	\N	DELETE	Attachment	b16c21da-462f-4ec8-81f4-b6de08f446c9	{"file_name": "1778226852280-531088256_ethio-emerald.jpg", "file_path": "uploads/attachments/1778226852280-531088256_ethio-emerald.jpg", "created_at": "2026-05-08T07:54:12.282Z", "uploaded_by": null, "attachment_id": "b16c21da-462f-4ec8-81f4-b6de08f446c9"}	\N	2026-05-08 01:14:04.492-07
7a6a077c-8746-407d-aabc-bf8984e9587a	00000000-0000-4000-8000-000000000001	CREATE	Gamestone	ff3d10f1-7a98-4dce-8a18-7dcae938ca3f	\N	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": null, "updated_at": "2026-05-08T08:14:08.207Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul><p></p>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": "91660636-e7be-4e67-b8c4-b7aa6ec7ca42", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 01:14:08.21-07
55aae88f-4215-43b9-a143-e7cd7916e770	\N	CREATE	Attachment	acc6bcca-d249-4e78-ad9b-8942da143eb2	\N	{"file_name": "1778228221421-483656894_ethio-emerald.jpg", "file_path": "uploads/attachments/1778228221421-483656894_ethio-emerald.jpg", "created_at": "2026-05-08T08:17:01.422Z", "uploaded_by": null, "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2"}	2026-05-08 01:17:01.427-07
b8c7902f-64e8-48ad-9d9c-d73664135e75	\N	DELETE	Attachment	91660636-e7be-4e67-b8c4-b7aa6ec7ca42	{"file_name": "1778228044410-798625430_Ethiopian-emerald.jpg", "file_path": "uploads/attachments/1778228044410-798625430_Ethiopian-emerald.jpg", "created_at": "2026-05-08T08:14:04.412Z", "uploaded_by": null, "attachment_id": "91660636-e7be-4e67-b8c4-b7aa6ec7ca42"}	\N	2026-05-08 01:17:01.519-07
3ef97620-713e-4dbd-8f8f-9ec39b09b251	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	ff3d10f1-7a98-4dce-8a18-7dcae938ca3f	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": null, "updated_at": "2026-05-08T08:14:08.207Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul><p></p>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": null, "discovered_date": "2016-11-08T00:00:00.000Z"}	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": null, "updated_at": "2026-05-08T08:17:04.004Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 01:17:04.006-07
a24f3c58-ce40-4a0d-9038-842aedd004f8	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	ff3d10f1-7a98-4dce-8a18-7dcae938ca3f	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": null, "updated_at": "2026-05-08T08:17:04.004Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "discovered_date": "2016-11-08T00:00:00.000Z"}	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": null, "updated_at": "2026-05-08T08:17:05.428Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 01:17:05.43-07
1e57dfab-ecc0-47ce-a379-9287cf311ebc	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	ff3d10f1-7a98-4dce-8a18-7dcae938ca3f	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": null, "updated_at": "2026-05-08T08:17:05.428Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "discovered_date": "2016-11-08T00:00:00.000Z"}	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T08:14:08.207Z", "deleted_at": "2026-05-08T08:18:20.153Z", "updated_at": "2026-05-08T08:17:05.428Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "ff3d10f1-7a98-4dce-8a18-7dcae938ca3f", "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 01:18:20.155-07
0e9d96ad-85f0-4f21-9660-efd9e53fc6bf	\N	CREATE	Attachment	515894af-3621-4ba3-8f27-a917c1e13060	\N	{"file_name": "1778228322436-766691958_Ethiopian-emerald.jpg", "file_path": "uploads/attachments/1778228322436-766691958_Ethiopian-emerald.jpg", "created_at": "2026-05-08T08:18:42.438Z", "uploaded_by": null, "attachment_id": "515894af-3621-4ba3-8f27-a917c1e13060"}	2026-05-08 01:18:42.441-07
4f6619c2-2891-4ac0-a386-1e8ea37b4a29	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	4aaeffb6-de37-4bb3-aec3-713784ff44e5	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:54:49.757Z", "deleted_at": null, "updated_at": "2026-05-08T07:54:49.757Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul><p></p>", "gamestone_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "attachment_id": null, "discovered_date": "2016-11-08T00:00:00.000Z"}	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:54:49.757Z", "deleted_at": null, "updated_at": "2026-05-08T08:18:46.423Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "attachment_id": "515894af-3621-4ba3-8f27-a917c1e13060", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 01:18:46.426-07
f62035da-c005-4890-9ccd-b487a29c27d9	00000000-0000-4000-8000-000000000001	UPDATE	Gamestone	4aaeffb6-de37-4bb3-aec3-713784ff44e5	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:54:49.757Z", "deleted_at": null, "updated_at": "2026-05-08T08:18:46.423Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "attachment_id": "515894af-3621-4ba3-8f27-a917c1e13060", "discovered_date": "2016-11-08T00:00:00.000Z"}	{"title": "Ethiopian Emerald", "location": "Shakiso, Oromia Region, Ethiopia", "parent_id": null, "created_at": "2026-05-08T07:54:49.757Z", "deleted_at": null, "updated_at": "2026-05-08T08:18:49.869Z", "description": "<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>", "gamestone_id": "4aaeffb6-de37-4bb3-aec3-713784ff44e5", "attachment_id": "515894af-3621-4ba3-8f27-a917c1e13060", "discovered_date": "2016-11-08T00:00:00.000Z"}	2026-05-08 01:18:49.871-07
2cb9b55e-64e9-4e46-929b-ee258e428661	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-07T18:30:13.361Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 100}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T10:53:37.155Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 110}	2026-05-08 03:53:37.16-07
95327026-6d22-4a03-8030-28f2230fdb86	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T10:53:37.155Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 110}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T12:44:22.918Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 120}	2026-05-08 05:44:22.923-07
f83c32d2-1644-482e-8678-c68004150bef	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T06:14:05.930Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 120}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T13:42:31.664Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 130}	2026-05-08 06:42:31.669-07
9c8dd75b-bf33-4760-bc8c-7f075dfe77ce	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T15:32:13.176Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 130}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T07:13:58.636Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 140}	2026-05-09 00:13:58.642-07
6f6a66c4-3171-4f76-9abe-a5583eff22b7	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-06T10:59:11.092Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 40}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T10:43:28.774Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 50}	2026-05-09 03:43:28.779-07
5c36b768-ce87-4392-ad16-a4f8b4ec0501	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-08T14:11:16.780Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 140}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T10:43:40.138Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 150}	2026-05-09 03:43:40.141-07
fb4a70c7-58d8-458f-8081-b95fd360d0c7	\N	CREATE	Message	3432269c-c759-4214-ab7a-d4411676921d	\N	{"message": "Dear HE. Engineer Habtamu Tegegne,\\n\\nOn behalf of Dubai Chambers, it is our pleasure to extend an invitation to Ministry of Mines - Ethiopia to participate in the high-level B2B Matchmaking Engagements as part of the Dubai New Horizons Roadshow: Ethiopia, taking place on Thursday, 21st May 2026 at the Sheraton Addis Hotel from 09:00 to 17:00.\\n\\nThis exclusive engagement has been carefully curated to facilitate strategic dialogue between leading UAE enterprises and prominent Ethiopian counterparts. The programme will convene a select group of invited senior executives, investors, and key public, private and government sector stakeholders to explore opportunities for trade expansion, investment partnerships, and long-term collaboration. The Roadshow will bring together decision-makers from across various sectors, including importers, exporters, distributors, investors, large enterprises, and government representatives, fostering a highly targeted environment for impactful business exchange.\\n\\nWe would be honoured by the participation of your leadership and remain committed to ensuring a tailored and productive engagement aligned with your strategic priorities. Please find attached the profiles of the participating companies from Dubai. Kindly let us know which companies you would like us to prioritize for your meetings. If you have any specific requirements or would like to highlight priority areas of interest in advance, please feel free to share them with us.\\n\\nTo confirm your participation and enable us to curate meetings of the highest relevance, we kindly request that you complete the registration form at your earliest convenience using the link below:\\nRegistration: https://forms.gle/7qmPQ65rwUSEMcRW9 \\n*Upon receipt of your registration, a formal confirmation along with your personalized meeting schedule will be shared. Attending the event is free of cost and by invite only.\\n\\nThe information provided will allow us to:\\n• Curate bespoke meetings with carefully selected UAE counterparts\\n• Facilitate high-value, one-on-one engagements with key decision-makers\\n• Maximise strategic outcomes and partnership opportunities during the Roadshow\\n\\nWe very much look forward to welcoming you, and to facilitating meaningful engagements during this distinguished gathering.\\nIf there are any companies or individuals in Ethiopia you believe would particularly benefit from in this event, we would appreciate you sharing their contact details so we may extend a personalized invitation with your reference.\\n\\nI am looking forward to meeting you in person at the event.\\nRegards,\\n\\nNeville Trindade\\nManaging Partner\\n", "subject": "Exclusive Invitation: Dubai New Horizons Roadshow - Ethiopia | Ministry of Mines - Ethiopia", "full_name": "Neville Trindade", "created_at": "2026-05-09T12:24:33.740Z", "deleted_at": null, "message_id": "3432269c-c759-4214-ab7a-d4411676921d", "updated_at": "2026-05-09T12:24:33.740Z", "email_address": "neville@b2bafrica.co.ke"}	2026-05-09 05:24:33.747-07
7239de10-5e33-4ebc-83c6-5ee1c67a6f58	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T07:13:58.636Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 140}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T13:46:11.384Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 150}	2026-05-09 06:46:11.389-07
67b00542-29f7-413b-99b5-73383bf50fab	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T13:46:11.384Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 150}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T17:26:46.454Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 160}	2026-05-09 10:26:46.458-07
bc509171-ce2a-4908-abcd-1fc22c315feb	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T10:43:40.138Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 150}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-10T00:59:02.551Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 160}	2026-05-09 17:59:02.555-07
515a29d3-3d62-431a-a48a-2ba62f0114ca	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T17:26:46.454Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 160}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-10T13:37:48.401Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 170}	2026-05-10 06:37:48.406-07
b5ef0c25-0105-4f9d-bb7a-03c99f82927a	\N	CREATE	Message	22886985-3261-403e-b5b1-6340b80662be	\N	{"message": "Hi, sorry for my english and i think i got a cilcite mine in my area around east gojjam so please contact me.", "subject": "Mine ", "full_name": "Messay Abera", "created_at": "2026-05-11T13:03:35.179Z", "deleted_at": null, "message_id": "22886985-3261-403e-b5b1-6340b80662be", "updated_at": "2026-05-11T13:03:35.179Z", "email_address": "Messayabera5@gmail.com"}	2026-05-11 06:03:35.187-07
afde996d-e308-4cd9-8244-743402c5d44a	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-10T00:59:02.551Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 160}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T08:18:59.992Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 170}	2026-05-12 01:18:59.997-07
1a9ea06c-6fa2-4f06-97c0-e6be0e193241	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-10T13:37:48.401Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 170}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T10:06:28.266Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 180}	2026-05-12 03:06:28.27-07
3e2ad0f6-0bbf-4c8e-a454-91beb1d986d5	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T08:18:59.992Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 170}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T10:07:28.307Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 180}	2026-05-12 03:07:28.311-07
3bc67d4b-0dd2-4390-a45a-ecb8cd5c9104	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-09T10:43:28.774Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 50}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T10:08:28.405Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 60}	2026-05-12 03:08:28.409-07
01bdad15-0db2-4dde-8e0e-163bd85702d6	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T10:06:28.266Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 180}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T14:51:52.175Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 190}	2026-05-12 07:51:52.182-07
1ec0068f-628c-48c3-9bb6-3e076cb8368a	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T14:51:52.175Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 190}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-13T16:22:39.679Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 200}	2026-05-13 09:22:39.683-07
acde9cce-0ba1-4f6b-bbbb-e7504ea4a72e	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T10:07:28.307Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 180}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-14T05:02:55.038Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 190}	2026-05-13 22:02:55.043-07
b12b5386-6e13-4905-a707-6e001412aa5c	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-14T05:02:55.038Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 190}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T05:38:35.971Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 200}	2026-05-14 22:38:35.977-07
cc22b4a7-d211-4edc-a9cf-7be2a54ed754	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T05:38:35.971Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 200}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T07:39:15.494Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 210}	2026-05-15 00:39:15.501-07
dbb4ba6b-a222-4c3f-9558-6ca45d729ad7	\N	CREATE	Message	bbb32c21-3fae-44ff-a5c5-298c78f1290a	\N	{"message": "Dear Sir,\\nWe are looking to invest in buying and exporting gold from Khartoum. Kindly could you please advice us on how we can apply for minerals dealers trading license and how much is the government taxes for exporting gold from Khartoum.\\nRegards \\nAbubakar Musa ", "subject": "Investing in buying and exporting gold ", "full_name": "Abubakar Musa ", "created_at": "2026-05-15T08:22:11.864Z", "deleted_at": null, "message_id": "bbb32c21-3fae-44ff-a5c5-298c78f1290a", "updated_at": "2026-05-15T08:22:11.864Z", "email_address": "abubakarmzeemusa@gmail.com"}	2026-05-15 01:22:11.879-07
01db4b2f-7c9a-461c-b7f5-f94ded676073	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-13T16:22:39.679Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 200}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T09:04:46.351Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 210}	2026-05-15 02:04:46.356-07
ad0da678-810c-4a35-85a2-a8fc2258c76d	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T07:39:15.494Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 210}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T11:10:48.051Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 220}	2026-05-15 04:10:48.056-07
4e5d8313-1e67-4de8-b467-b4588747fdad	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T09:04:46.351Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 210}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T11:11:56.206Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 220}	2026-05-15 04:11:56.21-07
744ea342-54dc-43b1-8c56-944862e33549	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T11:10:48.051Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 220}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T11:12:39.247Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 230}	2026-05-15 04:12:39.251-07
2f80140f-597f-47ef-9ae7-721ae17aee6a	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-12T10:08:28.405Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 60}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T20:41:53.167Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 70}	2026-05-15 13:41:53.172-07
e21ebbfc-89df-49f3-9367-652faf397cf5	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T11:12:39.247Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 230}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-16T01:00:11.761Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 240}	2026-05-15 18:00:11.767-07
a772829a-c131-4f2f-9584-d16ebf0d0ade	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-16T01:00:11.761Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 240}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T08:08:38.042Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 250}	2026-05-18 01:08:38.047-07
62ac4f2b-2c68-4d56-b844-bca186fa5c44	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T11:11:56.206Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 220}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T08:17:55.756Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 230}	2026-05-18 01:17:55.76-07
7dff0f60-de40-4793-8e70-b67fabda0d7e	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T08:17:55.756Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 230}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T08:32:24.388Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 240}	2026-05-18 01:32:24.392-07
31ba4b0d-72ac-42ee-a0b8-e05ea1ea3a01	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T08:32:24.388Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 240}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T10:41:04.664Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 250}	2026-05-18 03:41:04.668-07
a7c4faa6-6dd2-45ca-894b-2665ad38d851	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-15T20:41:53.167Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 70}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T13:03:54.586Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 80}	2026-05-18 06:03:54.591-07
637486ff-c066-4614-bf0a-b1fbec005866	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T10:41:04.664Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 250}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T13:04:07.945Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 260}	2026-05-18 06:04:07.948-07
9f0fef4b-86d9-4ca0-983d-70c0c54f7dc8	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T08:08:38.042Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 250}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-19T08:17:09.306Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 260}	2026-05-19 01:17:09.311-07
5f9f167d-9450-4faa-8ea7-27d00d8c614a	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-19T08:17:09.306Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 260}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-20T08:55:52.660Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 270}	2026-05-20 01:55:52.678-07
67794378-d15f-487d-b514-321d867c975f	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T13:04:07.945Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 260}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-20T11:22:29.401Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 270}	2026-05-20 04:22:29.405-07
d46e7c62-2216-4008-a420-1f697d593c78	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-20T08:55:52.660Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 270}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-20T11:22:57.259Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 280}	2026-05-20 04:22:57.263-07
b5648ad1-a311-4b9b-89ed-9dc00b13b121	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-20T11:22:57.259Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 280}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-21T08:02:40.038Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 290}	2026-05-21 01:02:40.042-07
a78f5af3-2b12-4b02-aef3-5b129448d615	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-18T13:03:54.586Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 80}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-21T08:11:40.956Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 90}	2026-05-21 01:11:40.96-07
d9538bdb-b9bb-46b1-9584-19147e3ef06c	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-21T08:02:40.038Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 290}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-22T07:51:04.795Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 300}	2026-05-22 00:51:04.799-07
1576beee-f77f-42e4-8c83-c04694f5b926	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-20T11:22:29.401Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 270}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-22T07:54:34.869Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 280}	2026-05-22 00:54:34.872-07
bfcddf37-5103-48e0-9e15-49835cce3270	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-22T07:51:04.795Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 300}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-22T07:59:20.420Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 310}	2026-05-22 00:59:20.424-07
8a31d8a2-79d6-46c9-9016-1777519f8e3c	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-22T07:54:34.869Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 280}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T10:09:41.305Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 290}	2026-05-25 03:09:41.317-07
ee01c58a-f5bd-4ddd-98ac-6c4308ad1e92	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-22T07:59:20.420Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 310}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T10:11:24.846Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 320}	2026-05-25 03:11:24.849-07
aff1b256-839f-4617-9a68-eccd71cced16	\N	CREATE	Message	84ad0556-e47d-444f-8255-7b132066a2fd	\N	{"message": "Iam member of cooperative gemstons from somali region so i need where can i direct to my sample", "subject": "Information", "full_name": "Ahmed", "created_at": "2026-05-25T17:50:50.426Z", "deleted_at": null, "message_id": "84ad0556-e47d-444f-8255-7b132066a2fd", "updated_at": "2026-05-25T17:50:50.426Z", "email_address": "Mahadallah14@gmail.com"}	2026-05-25 10:50:50.437-07
4748eeb2-8305-4928-96c2-6638eebf1268	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-21T08:11:40.956Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 90}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T23:34:11.133Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 100}	2026-05-25 16:34:11.139-07
9ce631c3-0cb5-4f97-a891-745a5d52a8fc	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T10:09:41.305Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 290}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T23:34:37.178Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 300}	2026-05-25 16:34:37.181-07
236005bd-5e8e-4dd6-88b6-bcb7298db8d0	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T23:34:11.133Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 100}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-26T19:14:49.244Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 110}	2026-05-26 12:14:49.249-07
a3ad5742-0539-42f0-bcc4-04bb8f118623	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T10:11:24.846Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 320}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-28T05:51:08.575Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 330}	2026-05-27 22:51:08.58-07
6c35c1a2-ca03-434d-9d12-4f866e0af207	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-25T23:34:37.178Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 300}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-28T05:54:05.055Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 310}	2026-05-27 22:54:05.06-07
e98d5898-1802-41dc-9858-83bd5cd22748	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-28T05:51:08.575Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 330}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-29T14:28:38.842Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 340}	2026-05-29 07:28:38.846-07
2fb8be1d-c54a-480e-8d74-669caddc9720	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-28T05:54:05.055Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 310}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-29T19:46:21.757Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 320}	2026-05-29 12:46:21.766-07
0560705c-6839-455b-8175-72db62c210a2	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-29T19:46:21.757Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 320}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T10:40:32.568Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 330}	2026-06-01 03:40:32.571-07
9a8e932a-661a-4745-a6d3-804b8bcb79da	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T10:40:32.568Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 330}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T11:46:26.125Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 340}	2026-06-01 04:46:26.129-07
4bda8ef4-8bc5-43e4-9e94-c6e9340280d0	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T11:46:26.125Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 340}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T12:05:45.637Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 350}	2026-06-01 05:05:45.642-07
5fcdf7ca-0718-4276-a4da-0a5e04395760	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T12:05:45.637Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 350}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T13:11:17.085Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 360}	2026-06-01 06:11:17.089-07
4c2b8331-d9e6-4121-91f0-95e806e1e3e2	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-01T13:11:17.085Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 360}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-02T12:52:31.637Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 370}	2026-06-02 05:52:31.642-07
2efdf973-b582-45d1-bd7e-a716c89237da	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-02T12:52:31.637Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 370}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-03T16:52:02.268Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 380}	2026-06-03 09:52:02.273-07
4e1172d0-7a61-4085-8cda-544845cbc59b	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-26T19:14:49.244Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 110}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-04T07:26:46.187Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 120}	2026-06-04 00:26:46.192-07
1050db7d-2333-44ef-9407-3007f5f042c3	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-03T16:52:02.268Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 380}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-04T12:24:12.245Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 390}	2026-06-04 05:24:12.249-07
5791dbd4-3ed0-44a8-8031-297e768820b6	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-04T12:24:12.245Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 390}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-04T19:45:28.843Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 400}	2026-06-04 12:45:28.847-07
4d9df0b9-b169-4901-a11b-89d0974d58b1	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-05-29T14:28:38.842Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 340}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T08:16:05.251Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 350}	2026-06-05 01:16:05.286-07
1b3224b9-1721-40e2-93e0-57b035844e7c	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T08:16:05.251Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 350}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T10:24:44.955Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 360}	2026-06-05 03:24:44.959-07
a762ee9e-6632-4d92-85c2-8d5c324668d3	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-04T19:45:28.843Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 400}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T10:26:50.574Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 410}	2026-06-05 03:26:50.577-07
a47aaaed-b3fb-4d16-827b-ba23c62b01bf	\N	CREATE	Message	a5e1341c-3d79-4c15-8dfd-47dd2618c7e3	\N	{"message": "I am translator foreigner want to explot copper from Ethiopia I need information concerning the procedure to invest in Ethiopia ", "subject": "Copper ", "full_name": "Hassen ", "created_at": "2026-06-05T11:57:01.313Z", "deleted_at": null, "message_id": "a5e1341c-3d79-4c15-8dfd-47dd2618c7e3", "updated_at": "2026-06-05T11:57:01.313Z", "email_address": "hasanidiris89@gmail.com"}	2026-06-05 04:57:01.323-07
e13aafaa-1e97-459d-a714-99d8f321cc4a	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T10:26:50.574Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 410}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:46:01.888Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 420}	2026-06-05 10:46:01.891-07
e6cb26a7-8bd1-42cf-bbf5-c605d697297a	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-04T07:26:46.187Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 120}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:46:14.460Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 130}	2026-06-05 10:46:14.463-07
ca2a9006-8dd8-4d80-9dd7-51108e6d0ead	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T10:24:44.955Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 360}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:50:22.609Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 370}	2026-06-05 10:50:22.617-07
6bbd9c58-44be-4b94-97dd-4c9fac5f4c05	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:46:01.888Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 420}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:51:00.295Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 430}	2026-06-05 10:51:00.299-07
0294ca12-a84c-423c-8a89-77432a3044a5	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:50:22.609Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 370}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:51:25.840Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 380}	2026-06-05 10:51:25.843-07
586eabe0-43eb-4a1c-b050-88b94d1dc292	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:51:00.295Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 430}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:52:29.491Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 440}	2026-06-05 10:52:29.493-07
a4923fdc-64f4-4a8f-bd3d-42d77d823cc4	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:52:29.491Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 440}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:52:57.633Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 450}	2026-06-05 10:52:57.636-07
0c5a51d8-1b87-49bc-be01-3135991e5e7e	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:51:25.840Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 380}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:55:56.780Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 390}	2026-06-05 10:55:56.783-07
91119596-5968-4767-81e8-f53a2880131f	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:52:57.633Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 450}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T18:02:54.059Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 460}	2026-06-05 11:02:54.064-07
677716f6-b13d-40a8-8aa6-3afdc83cc1bc	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:55:56.780Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 390}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T18:21:26.081Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 400}	2026-06-05 11:21:26.088-07
4f666995-4807-4c98-a6f5-8d74048e59b5	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T18:02:54.059Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 460}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-06T08:55:55.686Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 470}	2026-06-06 01:55:55.693-07
d554057b-4e20-4c56-b34b-e5f6f7b99620	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T17:46:14.460Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 130}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-06T15:50:48.111Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 140}	2026-06-06 08:50:48.118-07
a53c5fbe-576d-4a33-94d4-511abc328f9c	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-06T08:55:55.686Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 470}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-08T05:58:51.004Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 480}	2026-06-07 22:58:51.013-07
70b08dbe-95ba-4781-8a30-8ff442b6af7f	\N	CREATE	Attachment	881632e9-09ac-4ace-aa2a-1aeeafcdd8aa	\N	{"file_name": "1780898358751-914976241_cornea.png", "file_path": "uploads/attachments/1780898358751-914976241_cornea.png", "created_at": "2026-06-08T05:59:18.758Z", "uploaded_by": null, "attachment_id": "881632e9-09ac-4ace-aa2a-1aeeafcdd8aa"}	2026-06-07 22:59:18.781-07
56038a2e-5cb6-4947-bce0-ffbf88b0d587	\N	CREATE	Attachment	d5475308-796a-4719-8405-319d287e61a8	\N	{"file_name": "1780898358772-871628174_lumbar_support.jpg", "file_path": "uploads/attachments/1780898358772-871628174_lumbar_support.jpg", "created_at": "2026-06-08T05:59:18.773Z", "uploaded_by": null, "attachment_id": "d5475308-796a-4719-8405-319d287e61a8"}	2026-06-07 22:59:18.783-07
0123e429-57a3-4c3f-8e88-dab9700e9b81	\N	CREATE	Attachment	36758606-5185-4283-b7b9-aa30a61466eb	\N	{"file_name": "1780898358760-153294951_eye.jpg", "file_path": "uploads/attachments/1780898358760-153294951_eye.jpg", "created_at": "2026-06-08T05:59:18.761Z", "uploaded_by": null, "attachment_id": "36758606-5185-4283-b7b9-aa30a61466eb"}	2026-06-07 22:59:18.782-07
4ded23ce-b39d-40af-80d6-3ea35da1cb0d	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-08T05:58:51.004Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 480}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-08T06:07:37.610Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 490}	2026-06-07 23:07:37.615-07
207af236-397d-45af-af66-106062145a21	\N	CREATE	Attachment	172b9bb7-3ff2-4f76-892d-fa587a989c0a	\N	{"file_name": "1780899630827-853890181_photo_2026-05-06_09-39-45.jpg", "file_path": "uploads/attachments/1780899630827-853890181_photo_2026-05-06_09-39-45.jpg", "created_at": "2026-06-08T06:20:30.831Z", "uploaded_by": null, "attachment_id": "172b9bb7-3ff2-4f76-892d-fa587a989c0a"}	2026-06-07 23:20:30.862-07
a743e9c3-51a7-46d9-82a7-3f737539407a	00000000-0000-4000-8000-000000000001	CREATE	News	3d973a7d-6922-48df-9845-521a91d3e4fc	\N	{"title": "Grandier Ceramic Manufacturing Factory Inaugurated in Mojo, Marking Major Milestone for Ethiopia’s Industrial Transformation", "author": "Minstry of Mines", "status": "draft", "content": "<p><strong>Mojo,&nbsp;Ethiopia</strong>&nbsp;–&nbsp;Prime&nbsp;Minister&nbsp;Abiy&nbsp;Ahmed,&nbsp;together&nbsp;with&nbsp;senior&nbsp;government&nbsp;officials,&nbsp;has&nbsp;inaugurated&nbsp;the&nbsp;newly&nbsp;established&nbsp;<strong>Grandier&nbsp;Ceramic&nbsp;Manufacturing&nbsp;Factory</strong>&nbsp;in&nbsp;Mojo&nbsp;Town,&nbsp;a&nbsp;landmark&nbsp;industrial&nbsp;investment&nbsp;expected&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;manufacturing&nbsp;sector&nbsp;and&nbsp;reduce&nbsp;reliance&nbsp;on&nbsp;imported&nbsp;construction&nbsp;materials.</p><p>Constructed&nbsp;by&nbsp;<strong>Grandier&nbsp;Ceramic&nbsp;Manufacturing&nbsp;PLC</strong>,&nbsp;the&nbsp;factory&nbsp;was&nbsp;completed&nbsp;in&nbsp;just&nbsp;<strong>nine&nbsp;months</strong>,&nbsp;from&nbsp;planning&nbsp;and&nbsp;land&nbsp;preparation&nbsp;to&nbsp;full&nbsp;operational&nbsp;launch.&nbsp;Built&nbsp;on&nbsp;a&nbsp;<strong>300,000-square-meter&nbsp;site</strong>,&nbsp;the&nbsp;facility&nbsp;is&nbsp;designed&nbsp;to&nbsp;produce&nbsp;internationally&nbsp;standardized&nbsp;ceramic&nbsp;and&nbsp;porcelain&nbsp;tiles,&nbsp;positioning&nbsp;itself&nbsp;among&nbsp;Ethiopia’s&nbsp;most&nbsp;significant&nbsp;industrial&nbsp;manufacturing&nbsp;projects.</p><p>The&nbsp;factory&nbsp;has&nbsp;already&nbsp;begun&nbsp;large-scale&nbsp;production&nbsp;of&nbsp;<strong>60×60&nbsp;ceramic&nbsp;tiles</strong>&nbsp;and&nbsp;is&nbsp;expected&nbsp;to&nbsp;expand&nbsp;its&nbsp;product&nbsp;range&nbsp;within&nbsp;the&nbsp;next&nbsp;two&nbsp;months.&nbsp;Future&nbsp;production&nbsp;lines&nbsp;will&nbsp;include&nbsp;<strong>80×80,&nbsp;60×120,&nbsp;70×140,&nbsp;and&nbsp;80×160&nbsp;tile&nbsp;formats</strong>,&nbsp;as&nbsp;well&nbsp;as&nbsp;premium&nbsp;porcelain&nbsp;products&nbsp;that&nbsp;meet&nbsp;European&nbsp;quality&nbsp;standards.</p><p>With&nbsp;an&nbsp;investment&nbsp;exceeding&nbsp;<strong>2&nbsp;billion&nbsp;Ethiopian&nbsp;Birr</strong>,&nbsp;the&nbsp;project&nbsp;represents&nbsp;a&nbsp;significant&nbsp;chapter&nbsp;in&nbsp;Ethiopia’s&nbsp;ongoing&nbsp;industrialization&nbsp;journey.&nbsp;The&nbsp;factory&nbsp;is&nbsp;expected&nbsp;to&nbsp;contribute&nbsp;substantially&nbsp;to&nbsp;the&nbsp;country’s&nbsp;efforts&nbsp;to&nbsp;promote&nbsp;domestic&nbsp;manufacturing,&nbsp;create&nbsp;jobs,&nbsp;and&nbsp;enhance&nbsp;value-added&nbsp;production.</p><p>A&nbsp;key&nbsp;feature&nbsp;of&nbsp;the&nbsp;project&nbsp;is&nbsp;its&nbsp;strong&nbsp;local&nbsp;supply&nbsp;chain&nbsp;integration.&nbsp;Approximately&nbsp;<strong>80&nbsp;percent&nbsp;of&nbsp;the&nbsp;raw&nbsp;materials&nbsp;required&nbsp;for&nbsp;production&nbsp;are&nbsp;sourced&nbsp;within&nbsp;a&nbsp;100-kilometer&nbsp;radius&nbsp;of&nbsp;the&nbsp;factory</strong>,&nbsp;creating&nbsp;close&nbsp;links&nbsp;with&nbsp;surrounding&nbsp;communities&nbsp;and&nbsp;supporting&nbsp;local&nbsp;economic&nbsp;development.</p><p>The&nbsp;inauguration&nbsp;comes&nbsp;at&nbsp;a&nbsp;time&nbsp;when&nbsp;Ethiopia&nbsp;is&nbsp;intensifying&nbsp;its&nbsp;import-substitution&nbsp;strategy.&nbsp;According&nbsp;to&nbsp;government&nbsp;figures,&nbsp;the&nbsp;country&nbsp;has&nbsp;saved&nbsp;more&nbsp;than&nbsp;<strong>USD&nbsp;4.85&nbsp;billion&nbsp;in&nbsp;foreign&nbsp;exchange&nbsp;over&nbsp;the&nbsp;past&nbsp;nine&nbsp;months</strong>&nbsp;by&nbsp;replacing&nbsp;imported&nbsp;goods&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;The&nbsp;opening&nbsp;of&nbsp;Grandier&nbsp;Ceramic&nbsp;Factory&nbsp;is&nbsp;expected&nbsp;to&nbsp;further&nbsp;reduce&nbsp;dependence&nbsp;on&nbsp;imported&nbsp;ceramic&nbsp;products&nbsp;while&nbsp;enhancing&nbsp;Ethiopia’s&nbsp;competitiveness&nbsp;in&nbsp;regional&nbsp;and&nbsp;international&nbsp;markets.</p><p>Government&nbsp;officials&nbsp;highlighted&nbsp;the&nbsp;factory&nbsp;as&nbsp;an&nbsp;example&nbsp;of&nbsp;how&nbsp;strategic&nbsp;industrial&nbsp;investments&nbsp;can&nbsp;accelerate&nbsp;economic&nbsp;transformation,&nbsp;strengthen&nbsp;domestic&nbsp;production&nbsp;capacity,&nbsp;and&nbsp;contribute&nbsp;to&nbsp;sustainable&nbsp;economic&nbsp;growth.</p><p>The&nbsp;launch&nbsp;of&nbsp;the&nbsp;Grandier&nbsp;Ceramic&nbsp;Manufacturing&nbsp;Factory&nbsp;underscores&nbsp;Ethiopia’s&nbsp;commitment&nbsp;to&nbsp;expanding&nbsp;its&nbsp;industrial&nbsp;base&nbsp;and&nbsp;fostering&nbsp;a&nbsp;more&nbsp;resilient,&nbsp;self-reliant&nbsp;economy&nbsp;capable&nbsp;of&nbsp;competing&nbsp;in&nbsp;the&nbsp;global&nbsp;marketplace.</p>", "news_id": "3d973a7d-6922-48df-9845-521a91d3e4fc", "created_at": "2026-06-08T06:21:29.525Z", "deleted_at": null, "updated_at": "2026-06-08T06:21:29.525Z", "published_at": null}	2026-06-07 23:21:29.527-07
ba560829-b6ab-4b0e-8522-12bd23ccd93c	00000000-0000-4000-8000-000000000001	CREATE	NewsMetadata	da80a5e1-ae4e-4b16-825d-0ccd798d13db	\N	{"news_id": "3d973a7d-6922-48df-9845-521a91d3e4fc", "created_at": "2026-06-08T06:21:29.535Z", "like_count": 0, "read_count": 0, "updated_at": "2026-06-08T06:21:29.535Z", "dislike_count": 0, "news_metadata_id": "da80a5e1-ae4e-4b16-825d-0ccd798d13db", "average_read_time": 0}	2026-06-07 23:21:29.539-07
12639c9e-6cd6-42d1-8362-78d607249c58	\N	CREATE	Message	e5a9ddb8-238a-4789-9bd7-6bf85b87eddf	\N	{"message": "Good day!\\n\\nI am representative of gold trading company in Dubai. We would like to source reliable long term suppliers for gold. Will you be able to assist us with this. Thank you!", "subject": "Reliable source of gold", "full_name": "Ma Kailasa", "created_at": "2026-06-08T10:00:02.854Z", "deleted_at": null, "message_id": "e5a9ddb8-238a-4789-9bd7-6bf85b87eddf", "updated_at": "2026-06-08T10:00:02.854Z", "email_address": "ma.kailaasa@gmail.com"}	2026-06-08 03:00:02.955-07
fe234813-1404-491d-bc3c-91001f78a150	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-08T06:07:37.610Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 490}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-08T14:23:17.993Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 500}	2026-06-08 07:23:17.997-07
ac26d018-226c-4442-8430-67cca4e86155	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-08T14:23:17.993Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 500}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-09T10:47:44.361Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 510}	2026-06-09 03:47:44.37-07
7f75d4fa-a132-43f8-8960-11a9a5d4250b	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-09T10:47:44.361Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 510}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-09T19:40:48.846Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 520}	2026-06-09 12:40:48.85-07
8ade9e46-ae31-40e3-aa6b-3e56104aff23	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-05T18:21:26.081Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 400}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T08:29:54.745Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 410}	2026-06-10 01:29:54.75-07
c38907b7-9c92-475f-abfe-3d6ef7a6818f	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-09T19:40:48.846Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 520}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T12:33:19.004Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 530}	2026-06-10 05:33:19.01-07
c32bbd5b-3511-4d85-ab9a-a5606bd3cc45	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T08:29:54.745Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 410}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T14:22:15.562Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 420}	2026-06-10 07:22:15.578-07
06f6fd93-c095-4f2a-9127-67b3fb10180f	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T12:33:19.004Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 530}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T20:32:56.080Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 540}	2026-06-10 13:32:56.084-07
925393bf-4e0c-4e8a-8c30-bc1c910f1de9	\N	CREATE	Message	58bb5192-f7f0-4e2d-83fa-faf2996813b0	\N	{"message": "Maalif albuudaalee biyyaa kenyaa kessaa jiraattu hin fayyadamnee. Fakenyaaf My GPS coordinates:   Latitude: 7.467884  Longitude: 37.25202  naannoo kanarra kan jirutti", "subject": "Ittin fayyadamaa albuudaalee ", "full_name": "Ezadin sherif Abdalla ", "created_at": "2026-06-11T00:02:56.639Z", "deleted_at": null, "message_id": "58bb5192-f7f0-4e2d-83fa-faf2996813b0", "updated_at": "2026-06-11T00:02:56.639Z", "email_address": "beyyaamtubee@gmail.com"}	2026-06-10 17:02:56.673-07
02c5e88f-a3f4-42fb-bb7c-5eadac9b5db6	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T20:32:56.080Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 540}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-11T11:44:59.908Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 550}	2026-06-11 04:44:59.913-07
d029e737-9ec9-4c2a-ad9b-e40f41649a52	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-11T11:44:59.908Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 550}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-11T13:15:19.294Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 560}	2026-06-11 06:15:19.299-07
816a6595-f7d2-448b-8a56-f10baec1e788	\N	CREATE	Message	7bce34c8-2335-436a-8d9b-17dbb882e56e	\N	{"message": "Ani albuuda sibilaa magineti harkisu argadhe akkafu akka degarsa naf gootan kabajaan isin gafadha ", "subject": "Albuuda sibilaa magineti ", "full_name": "Mohammed mahamud ahmed", "created_at": "2026-06-11T14:15:55.401Z", "deleted_at": null, "message_id": "7bce34c8-2335-436a-8d9b-17dbb882e56e", "updated_at": "2026-06-11T14:15:55.401Z", "email_address": "mohammedmahamud445@gmail.com"}	2026-06-11 07:15:55.41-07
d9a37041-2ee3-4474-a4ad-b0eebc61ffd1	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-11T13:15:19.294Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 560}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-12T05:16:30.613Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 570}	2026-06-11 22:16:30.621-07
42139d26-d42e-417c-b1fe-a9885866321d	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-06T15:50:48.111Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 140}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-13T18:05:30.671Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 150}	2026-06-13 11:05:30.674-07
851a15f0-bf11-43ea-a358-2c7a8921b810	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-12T05:16:30.613Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 570}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-14T06:28:45.552Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 580}	2026-06-13 23:28:45.558-07
9171a989-7fbd-4f3d-bb8d-c82748b940c0	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-14T06:28:45.552Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 580}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-14T06:29:45.470Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 590}	2026-06-13 23:29:45.474-07
780d5af7-9a68-493b-81f2-527ff2fc701b	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-10T14:22:15.562Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 420}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-15T11:41:37.539Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 430}	2026-06-15 04:41:37.553-07
d6cbdd26-97e4-4a82-a617-0257bfc78ff8	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-13T18:05:30.671Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 150}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-15T11:52:53.674Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 160}	2026-06-15 04:52:53.676-07
7a398de8-c274-4a19-a395-ddb7ba73d6cc	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-15T11:41:37.539Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 430}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-15T12:47:28.755Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 440}	2026-06-15 05:47:28.76-07
bcfb56bd-16ab-4ccb-bd3c-5a4897103a18	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-15T12:47:28.755Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 440}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T12:55:39.109Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 450}	2026-06-16 05:55:39.114-07
86cd6cbc-f904-4731-acd2-02b231d2a2a5	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T12:55:39.109Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 450}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T13:24:51.273Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 460}	2026-06-16 06:24:51.289-07
7dc8a27e-ce58-4560-9992-203cd94b139f	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T13:24:51.273Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 460}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T13:33:21.625Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 470}	2026-06-16 06:33:21.628-07
8eeff594-ced6-4046-ad95-5f5a3a810fec	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-14T06:29:45.470Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 590}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T13:55:12.714Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 600}	2026-06-16 06:55:12.728-07
95fa1a32-7400-4e3a-898e-f13849cfee25	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T13:55:12.714Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 600}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T20:32:53.327Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 610}	2026-06-16 13:32:53.334-07
1cfd09c3-d504-4363-9abe-277f7627cc38	\N	CREATE	Message	2f2332de-ab1a-4f77-a4d8-448f07895886	\N	{"message": "Could you provide a registered list off suppliers in Ethiopia\\nThis on behalf off Akobo / Etno Minerals", "subject": "Registered Explosive / Detonators suppliers in Addis", "full_name": "samuel sileshi", "created_at": "2026-06-17T08:51:23.967Z", "deleted_at": null, "message_id": "2f2332de-ab1a-4f77-a4d8-448f07895886", "updated_at": "2026-06-17T08:51:23.967Z", "email_address": "samuel@akobominerals.com"}	2026-06-17 01:51:23.974-07
5ab87725-92d0-466d-ad79-57ba5311e353	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T20:32:53.327Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 610}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-17T13:24:44.691Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 620}	2026-06-17 06:24:44.695-07
662cb4dd-9d43-47ee-b68a-8a171b04a727	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-17T13:24:44.691Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 620}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T03:35:13.955Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 630}	2026-06-17 20:35:13.96-07
ddbbd21c-0555-4944-a903-4e8574c634bf	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T03:35:13.955Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 630}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T04:57:16.526Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 640}	2026-06-17 21:57:16.531-07
e40f47d4-f27e-4adb-b244-516f6568e857	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T04:57:16.526Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 640}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T07:39:16.067Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 650}	2026-06-18 00:39:16.077-07
ebd6245c-7661-439b-abb1-0c35830df3d9	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-16T13:33:21.625Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 470}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T07:39:29.710Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 480}	2026-06-18 00:39:29.713-07
dbf6394f-52bb-47f0-865e-c8346234b8e6	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T07:39:16.067Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 650}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T12:51:12.503Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 660}	2026-06-18 05:51:12.508-07
283e83a8-e9b1-4b63-a3c3-19ecd04a5cdb	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T12:51:12.503Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 660}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T13:06:22.452Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 670}	2026-06-18 06:06:22.458-07
f5094cb0-4e8d-49b0-bfe2-08c0f86c5b5e	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T13:06:22.452Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 670}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T22:27:51.316Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 680}	2026-06-18 15:27:51.32-07
10297119-e5b7-4d82-bee4-a5f8cd6505c6	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T07:39:29.710Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 480}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T22:27:51.499Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 490}	2026-06-18 15:27:51.502-07
daf2f182-ab80-49fb-a421-e730e08d60f1	\N	UPDATE	NewsRead	44579dbb-9eb5-4957-9f78-cac82a81724b	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-15T11:52:53.674Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 160}	{"news_id": "c9f69b86-b02f-4e0a-9c42-9520683613aa", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T22:27:51.879Z", "news_read_id": "44579dbb-9eb5-4957-9f78-cac82a81724b", "total_read_time": 170}	2026-06-18 15:27:51.882-07
500ebf0e-b976-45b4-9dbb-0b2cbe99415e	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T22:27:51.316Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 680}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-19T17:01:08.562Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 690}	2026-06-19 10:01:08.565-07
e511f8bd-9543-46dd-88f2-18030368da9e	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-19T17:01:08.562Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 690}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-20T14:52:46.207Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 700}	2026-06-20 07:52:46.214-07
898bec0c-df8f-44c4-8e33-27aedf70b519	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-18T22:27:51.499Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 490}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-20T20:12:25.676Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 500}	2026-06-20 13:12:25.685-07
b0f4e9a5-0975-4db7-a347-448d9bab3a1d	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-20T14:52:46.207Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 700}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-20T20:12:49.572Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 710}	2026-06-20 13:12:49.575-07
69a24a0f-3dad-409a-8584-6535b165f91c	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-20T20:12:49.572Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 710}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-21T19:35:03.029Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 720}	2026-06-21 12:35:03.034-07
d95ac9a3-e722-485b-8735-04d811f8f39c	\N	UPDATE	Permission	eca94543-ad28-44ce-81e3-f9a0583237ac	{"action": "create", "resource": "about", "is_active": true, "created_at": "2026-04-28T13:48:34.871Z", "updated_at": "2026-04-28T13:48:34.871Z", "permission_id": "eca94543-ad28-44ce-81e3-f9a0583237ac"}	{"action": "create", "resource": "about", "is_active": false, "created_at": "2026-04-28T13:48:34.871Z", "updated_at": "2026-04-28T13:48:34.871Z", "permission_id": "eca94543-ad28-44ce-81e3-f9a0583237ac"}	2026-06-21 12:37:32.246-07
109741a2-fc12-4889-be6e-55f38ff7c5ca	\N	UPDATE	Permission	eca94543-ad28-44ce-81e3-f9a0583237ac	{"action": "create", "resource": "about", "is_active": false, "created_at": "2026-04-28T13:48:34.871Z", "updated_at": "2026-04-28T13:48:34.871Z", "permission_id": "eca94543-ad28-44ce-81e3-f9a0583237ac"}	{"action": "create", "resource": "about", "is_active": true, "created_at": "2026-04-28T13:48:34.871Z", "updated_at": "2026-04-28T13:48:34.871Z", "permission_id": "eca94543-ad28-44ce-81e3-f9a0583237ac"}	2026-06-21 12:37:39.457-07
d4fc3272-8b4e-4f8b-be6e-0bae014a821c	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-20T20:12:25.676Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 500}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-21T20:02:20.916Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 510}	2026-06-21 13:02:20.926-07
8c1d28ad-e2c5-4feb-9e9c-d8338a057365	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-21T19:35:03.029Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 720}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-22T03:47:57.669Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 730}	2026-06-21 20:47:57.679-07
61c77ed6-132b-4125-a42f-b412522d29c0	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-22T03:47:57.669Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 730}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-22T07:09:20.611Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 740}	2026-06-22 00:09:20.618-07
522f3b0a-0368-4f48-b60b-652461e6cec1	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-22T07:09:20.611Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 740}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T02:01:41.289Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 750}	2026-06-22 19:01:41.295-07
f2d87f59-e6f9-4b61-af81-a82445c18fd8	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-21T20:02:20.916Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 510}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T06:24:05.518Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 520}	2026-06-22 23:24:05.528-07
eab29078-0171-4305-88de-b6928017b14f	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T02:01:41.289Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 750}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T06:24:47.245Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 760}	2026-06-22 23:24:47.248-07
08c929ac-37b9-46fb-b501-91b47d1abff2	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T06:24:05.518Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 520}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T06:26:38.552Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 530}	2026-06-22 23:26:38.555-07
e17395eb-bd76-44ca-a69f-70f783b61d6e	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T06:26:38.552Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 530}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T08:57:59.385Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 540}	2026-06-23 01:57:59.389-07
fca92e08-24f0-4734-9d85-f32f5f673d80	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T08:57:59.385Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 540}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T12:43:00.988Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 550}	2026-06-23 05:43:00.993-07
cafae2d0-7c70-40eb-a8b6-e41401f069b8	\N	UPDATE	NewsRead	e7a5b03f-f400-4879-8cd3-61f3643c8414	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T06:24:47.245Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 760}	{"news_id": "760a8bee-5c9e-4ff0-ab49-235ca84ef3a6", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-24T06:23:14.048Z", "news_read_id": "e7a5b03f-f400-4879-8cd3-61f3643c8414", "total_read_time": 770}	2026-06-23 23:23:14.068-07
36d89515-7736-4f8b-b492-fa0b2f742a97	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-23T12:43:00.988Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 550}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-24T06:23:41.960Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 560}	2026-06-23 23:23:41.962-07
665f79a1-667a-4b39-b25a-234a82065fe1	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-24T06:23:41.960Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 560}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-24T06:47:10.063Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 570}	2026-06-23 23:47:10.067-07
e4e52240-e1aa-4616-8820-5ca3a9b3b7a2	\N	UPDATE	NewsRead	3d577cee-2159-49e1-95a0-3db2d5d6ec0c	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-24T06:47:10.063Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 570}	{"news_id": "2c2acb5c-2f57-4b8d-adbc-420ceac18a1c", "ip_address": "::ffff:172.18.0.6", "last_read_at": "2026-06-24T07:54:08.617Z", "news_read_id": "3d577cee-2159-49e1-95a0-3db2d5d6ec0c", "total_read_time": 580}	2026-06-24 00:54:08.622-07
22b12931-6fe1-4236-9b0a-35263231da40	\N	UPDATE	Attachment	91b5afae-abc5-4f9b-ac0a-1cef4845a528	{"width": null, "height": null, "file_name": "1777437882434-444237339_StockCake-Sunrise_Mine_Machinery-433183-standard.jpg", "file_path": "uploads/attachments/1777437882434-444237339_StockCake-Sunrise_Mine_Machinery-433183-standard.jpg", "mime_type": null, "created_at": "2026-04-29T04:44:42.440Z", "uploaded_by": null, "attachment_id": "91b5afae-abc5-4f9b-ac0a-1cef4845a528", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1456, "height": 816, "file_name": "1777437882434-444237339_StockCake-Sunrise_Mine_Machinery-433183-standard.jpg", "file_path": "uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T04:44:42.440Z", "uploaded_by": null, "attachment_id": "91b5afae-abc5-4f9b-ac0a-1cef4845a528", "file_path_large": "uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/large.webp", "file_path_thumb": "uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/thumb.webp", "file_path_medium": "uploads/attachments/91b5afae-abc5-4f9b-ac0a-1cef4845a528/medium.webp"}	2026-06-24 02:48:43.057-07
db0f7da6-2dc9-4020-987c-d1dc927c3fc4	\N	UPDATE	Attachment	b3c58304-f4fd-4261-93f1-90e55abaa23e	{"width": null, "height": null, "file_name": "1777438589505-791318996_charlvera-ai-generated-8708404_1920.jpg", "file_path": "uploads/attachments/1777438589505-791318996_charlvera-ai-generated-8708404_1920.jpg", "mime_type": null, "created_at": "2026-04-29T04:56:29.509Z", "uploaded_by": null, "attachment_id": "b3c58304-f4fd-4261-93f1-90e55abaa23e", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1920, "height": 1097, "file_name": "1777438589505-791318996_charlvera-ai-generated-8708404_1920.jpg", "file_path": "uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T04:56:29.509Z", "uploaded_by": null, "attachment_id": "b3c58304-f4fd-4261-93f1-90e55abaa23e", "file_path_large": "uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/large.webp", "file_path_thumb": "uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/thumb.webp", "file_path_medium": "uploads/attachments/b3c58304-f4fd-4261-93f1-90e55abaa23e/medium.webp"}	2026-06-24 02:48:43.288-07
51090c15-304a-429a-8112-998d72b15a21	\N	UPDATE	Attachment	64fd31fe-b3a6-4a9b-9d5a-04bd9842003d	{"width": null, "height": null, "file_name": "1777439965285-590268150_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/1777439965285-590268150_financial-growth-investment-success-with-stacks-gold-coins.jpg", "mime_type": null, "created_at": "2026-04-29T05:19:25.326Z", "uploaded_by": null, "attachment_id": "64fd31fe-b3a6-4a9b-9d5a-04bd9842003d", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 8736, "height": 4896, "file_name": "1777439965285-590268150_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:19:25.326Z", "uploaded_by": null, "attachment_id": "64fd31fe-b3a6-4a9b-9d5a-04bd9842003d", "file_path_large": "uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/large.webp", "file_path_thumb": "uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/thumb.webp", "file_path_medium": "uploads/attachments/64fd31fe-b3a6-4a9b-9d5a-04bd9842003d/medium.webp"}	2026-06-24 02:48:44.566-07
2352a99e-97a8-4da2-afcd-e0d40d5c77f9	\N	UPDATE	Attachment	fe50ac36-5dcb-422f-bb4a-ac503118faed	{"width": null, "height": null, "file_name": "1777439978593-292949641_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/1777439978593-292949641_financial-growth-investment-success-with-stacks-gold-coins.jpg", "mime_type": null, "created_at": "2026-04-29T05:19:38.614Z", "uploaded_by": null, "attachment_id": "fe50ac36-5dcb-422f-bb4a-ac503118faed", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 8736, "height": 4896, "file_name": "1777439978593-292949641_financial-growth-investment-success-with-stacks-gold-coins.jpg", "file_path": "uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:19:38.614Z", "uploaded_by": null, "attachment_id": "fe50ac36-5dcb-422f-bb4a-ac503118faed", "file_path_large": "uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/large.webp", "file_path_thumb": "uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/thumb.webp", "file_path_medium": "uploads/attachments/fe50ac36-5dcb-422f-bb4a-ac503118faed/medium.webp"}	2026-06-24 02:48:45.862-07
d6b908c5-8e7a-47a4-b013-edce20d078a1	\N	UPDATE	Attachment	058f02be-e6f8-4f5d-8221-0a15afa2ca0e	{"width": null, "height": null, "file_name": "1777441104431-353194401_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/1777441104431-353194401_delicious-candy-looking-like-gems-arrangement.jpg", "mime_type": null, "created_at": "2026-04-29T05:38:24.513Z", "uploaded_by": null, "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 6720, "height": 4480, "file_name": "1777441104431-353194401_delicious-candy-looking-like-gems-arrangement.jpg", "file_path": "uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:38:24.513Z", "uploaded_by": null, "attachment_id": "058f02be-e6f8-4f5d-8221-0a15afa2ca0e", "file_path_large": "uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/large.webp", "file_path_thumb": "uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/thumb.webp", "file_path_medium": "uploads/attachments/058f02be-e6f8-4f5d-8221-0a15afa2ca0e/medium.webp"}	2026-06-24 02:48:47.293-07
07900b40-2099-44f6-9a25-908519ce3daa	\N	UPDATE	Attachment	29a3598c-d576-42c3-aa22-8e8415fb623b	{"width": null, "height": null, "file_name": "1777441426422-649197194_communicationcy-open-pit-mining-920200.jpg", "file_path": "uploads/attachments/1777441426422-649197194_communicationcy-open-pit-mining-920200.jpg", "mime_type": null, "created_at": "2026-04-29T05:43:46.447Z", "uploaded_by": null, "attachment_id": "29a3598c-d576-42c3-aa22-8e8415fb623b", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 4238, "height": 2772, "file_name": "1777441426422-649197194_communicationcy-open-pit-mining-920200.jpg", "file_path": "uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:43:46.447Z", "uploaded_by": null, "attachment_id": "29a3598c-d576-42c3-aa22-8e8415fb623b", "file_path_large": "uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/large.webp", "file_path_thumb": "uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/thumb.webp", "file_path_medium": "uploads/attachments/29a3598c-d576-42c3-aa22-8e8415fb623b/medium.webp"}	2026-06-24 02:48:47.841-07
9c8b3050-7749-458b-bc62-dd96c689bc69	\N	UPDATE	Attachment	519dbdc4-1e62-4820-b5ad-06acb7cf979d	{"width": null, "height": null, "file_name": "1777441899337-261053355_dump-truck-pit-mine_1.jpg", "file_path": "uploads/attachments/1777441899337-261053355_dump-truck-pit-mine_1.jpg", "mime_type": null, "created_at": "2026-04-29T05:51:39.399Z", "uploaded_by": null, "attachment_id": "519dbdc4-1e62-4820-b5ad-06acb7cf979d", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 4752, "height": 3168, "file_name": "1777441899337-261053355_dump-truck-pit-mine_1.jpg", "file_path": "uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:51:39.399Z", "uploaded_by": null, "attachment_id": "519dbdc4-1e62-4820-b5ad-06acb7cf979d", "file_path_large": "uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/large.webp", "file_path_thumb": "uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/thumb.webp", "file_path_medium": "uploads/attachments/519dbdc4-1e62-4820-b5ad-06acb7cf979d/medium.webp"}	2026-06-24 02:48:48.634-07
a9f7e0ea-1d07-4846-ba31-0b41a193504d	\N	UPDATE	Attachment	6f6d7aa5-1f62-48e2-9944-25d3688342e0	{"width": null, "height": null, "file_name": "1777442279809-2245219_world-bank-logo.png", "file_path": "uploads/attachments/1777442279809-2245219_world-bank-logo.png", "mime_type": null, "created_at": "2026-04-29T05:57:59.811Z", "uploaded_by": null, "attachment_id": "6f6d7aa5-1f62-48e2-9944-25d3688342e0", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1080, "height": 1080, "file_name": "1777442279809-2245219_world-bank-logo.png", "file_path": "uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:57:59.811Z", "uploaded_by": null, "attachment_id": "6f6d7aa5-1f62-48e2-9944-25d3688342e0", "file_path_large": "uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/large.webp", "file_path_thumb": "uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/thumb.webp", "file_path_medium": "uploads/attachments/6f6d7aa5-1f62-48e2-9944-25d3688342e0/medium.webp"}	2026-06-24 02:48:48.917-07
d44e1c65-93fd-40fb-adb3-ec7b527afca8	\N	UPDATE	Attachment	2071c280-24f5-4c27-92d8-6571077d58eb	{"width": null, "height": null, "file_name": "1777442369804-155274116_african-development-fund-logo-png_seeklogo-508981.png", "file_path": "uploads/attachments/1777442369804-155274116_african-development-fund-logo-png_seeklogo-508981.png", "mime_type": null, "created_at": "2026-04-29T05:59:29.805Z", "uploaded_by": null, "attachment_id": "2071c280-24f5-4c27-92d8-6571077d58eb", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 600, "height": 600, "file_name": "1777442369804-155274116_african-development-fund-logo-png_seeklogo-508981.png", "file_path": "uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T05:59:29.805Z", "uploaded_by": null, "attachment_id": "2071c280-24f5-4c27-92d8-6571077d58eb", "file_path_large": "uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/large.webp", "file_path_thumb": "uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/thumb.webp", "file_path_medium": "uploads/attachments/2071c280-24f5-4c27-92d8-6571077d58eb/medium.webp"}	2026-06-24 02:48:49-07
a00c231f-ade1-4d1d-962b-264e59b373b5	\N	UPDATE	Attachment	24c71477-1316-4e6d-b991-8afdfc122b86	{"width": null, "height": null, "file_name": "1777442494906-38160186_images.png", "file_path": "uploads/attachments/1777442494906-38160186_images.png", "mime_type": null, "created_at": "2026-04-29T06:01:34.907Z", "uploaded_by": null, "attachment_id": "24c71477-1316-4e6d-b991-8afdfc122b86", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 372, "height": 135, "file_name": "1777442494906-38160186_images.png", "file_path": "uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T06:01:34.907Z", "uploaded_by": null, "attachment_id": "24c71477-1316-4e6d-b991-8afdfc122b86", "file_path_large": "uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/large.webp", "file_path_thumb": "uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/thumb.webp", "file_path_medium": "uploads/attachments/24c71477-1316-4e6d-b991-8afdfc122b86/medium.webp"}	2026-06-24 02:48:49.026-07
2cd109ac-a595-4369-a9f5-887877c4693a	\N	UPDATE	Attachment	e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d	{"width": null, "height": null, "file_name": "1777442709741-638605964_map.jpg", "file_path": "uploads/attachments/1777442709741-638605964_map.jpg", "mime_type": null, "created_at": "2026-04-29T06:05:09.786Z", "uploaded_by": null, "attachment_id": "e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 7500, "height": 5000, "file_name": "1777442709741-638605964_map.jpg", "file_path": "uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T06:05:09.786Z", "uploaded_by": null, "attachment_id": "e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d", "file_path_large": "uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/large.webp", "file_path_thumb": "uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/thumb.webp", "file_path_medium": "uploads/attachments/e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d/medium.webp"}	2026-06-24 02:48:49.539-07
fe5a0f0b-ff3a-4a04-9e32-82494fd8decb	\N	UPDATE	Attachment	bed2b9fc-17d5-4ddf-89b0-c6522c2da72c	{"width": null, "height": null, "file_name": "1777443023002-366671770_goal.png", "file_path": "uploads/attachments/1777443023002-366671770_goal.png", "mime_type": null, "created_at": "2026-04-29T06:10:23.003Z", "uploaded_by": null, "attachment_id": "bed2b9fc-17d5-4ddf-89b0-c6522c2da72c", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 512, "height": 512, "file_name": "1777443023002-366671770_goal.png", "file_path": "uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T06:10:23.003Z", "uploaded_by": null, "attachment_id": "bed2b9fc-17d5-4ddf-89b0-c6522c2da72c", "file_path_large": "uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/large.webp", "file_path_thumb": "uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/thumb.webp", "file_path_medium": "uploads/attachments/bed2b9fc-17d5-4ddf-89b0-c6522c2da72c/medium.webp"}	2026-06-24 02:48:49.649-07
de11b8e8-7efb-415a-81e7-46ad7f40d613	\N	UPDATE	Attachment	737ce471-6078-4c06-9cb5-4e2912dd6ba7	{"width": null, "height": null, "file_name": "1777443027454-83419380_witness.png", "file_path": "uploads/attachments/1777443027454-83419380_witness.png", "mime_type": null, "created_at": "2026-04-29T06:10:27.455Z", "uploaded_by": null, "attachment_id": "737ce471-6078-4c06-9cb5-4e2912dd6ba7", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 512, "height": 512, "file_name": "1777443027454-83419380_witness.png", "file_path": "uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T06:10:27.455Z", "uploaded_by": null, "attachment_id": "737ce471-6078-4c06-9cb5-4e2912dd6ba7", "file_path_large": "uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/large.webp", "file_path_thumb": "uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/thumb.webp", "file_path_medium": "uploads/attachments/737ce471-6078-4c06-9cb5-4e2912dd6ba7/medium.webp"}	2026-06-24 02:48:49.749-07
f7f8f324-8a7c-4b9b-b189-44e7204cfef3	\N	UPDATE	Attachment	f11861df-6e14-4dae-8c30-a2031626751a	{"width": null, "height": null, "file_name": "1777443032701-299833419_diamond.png", "file_path": "uploads/attachments/1777443032701-299833419_diamond.png", "mime_type": null, "created_at": "2026-04-29T06:10:32.702Z", "uploaded_by": null, "attachment_id": "f11861df-6e14-4dae-8c30-a2031626751a", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 512, "height": 512, "file_name": "1777443032701-299833419_diamond.png", "file_path": "uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T06:10:32.702Z", "uploaded_by": null, "attachment_id": "f11861df-6e14-4dae-8c30-a2031626751a", "file_path_large": "uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/large.webp", "file_path_thumb": "uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/thumb.webp", "file_path_medium": "uploads/attachments/f11861df-6e14-4dae-8c30-a2031626751a/medium.webp"}	2026-06-24 02:48:49.859-07
b2d55211-10dd-4e15-8b02-991a81b85364	\N	UPDATE	Attachment	b9e92df0-a3d1-4f86-b6fa-c439e6160b38	{"width": null, "height": null, "file_name": "1777443351192-184025141_futuristic-smart-city-with-5g-global-network-technology.jpg", "file_path": "uploads/attachments/1777443351192-184025141_futuristic-smart-city-with-5g-global-network-technology.jpg", "mime_type": null, "created_at": "2026-04-29T06:15:51.262Z", "uploaded_by": null, "attachment_id": "b9e92df0-a3d1-4f86-b6fa-c439e6160b38", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 4391, "height": 2927, "file_name": "1777443351192-184025141_futuristic-smart-city-with-5g-global-network-technology.jpg", "file_path": "uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T06:15:51.262Z", "uploaded_by": null, "attachment_id": "b9e92df0-a3d1-4f86-b6fa-c439e6160b38", "file_path_large": "uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/large.webp", "file_path_thumb": "uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/thumb.webp", "file_path_medium": "uploads/attachments/b9e92df0-a3d1-4f86-b6fa-c439e6160b38/medium.webp"}	2026-06-24 02:48:50.713-07
8a535afe-e8af-487f-8bfd-51042a4d73dd	\N	UPDATE	Attachment	2683be44-e55d-4fe1-bcc4-ecf12c25fb96	{"width": null, "height": null, "file_name": "1777449349261-464739902_habtamu-tegegn-profile.jpg", "file_path": "uploads/attachments/1777449349261-464739902_habtamu-tegegn-profile.jpg", "mime_type": null, "created_at": "2026-04-29T07:55:49.275Z", "uploaded_by": null, "attachment_id": "2683be44-e55d-4fe1-bcc4-ecf12c25fb96", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 3268, "height": 3268, "file_name": "1777449349261-464739902_habtamu-tegegn-profile.jpg", "file_path": "uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T07:55:49.275Z", "uploaded_by": null, "attachment_id": "2683be44-e55d-4fe1-bcc4-ecf12c25fb96", "file_path_large": "uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/large.webp", "file_path_thumb": "uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/thumb.webp", "file_path_medium": "uploads/attachments/2683be44-e55d-4fe1-bcc4-ecf12c25fb96/medium.webp"}	2026-06-24 02:48:51.312-07
27baafe3-3912-4cfa-a4f6-ef0df29bcb89	\N	UPDATE	Attachment	c09db559-9b29-49d3-9ffa-b75700d7a95d	{"width": null, "height": null, "file_name": "1777461893080-617149355_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/1777461893080-617149355_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "mime_type": null, "created_at": "2026-04-29T11:24:53.082Z", "uploaded_by": null, "attachment_id": "c09db559-9b29-49d3-9ffa-b75700d7a95d", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 960, "file_name": "1777461893080-617149355_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T11:24:53.082Z", "uploaded_by": null, "attachment_id": "c09db559-9b29-49d3-9ffa-b75700d7a95d", "file_path_large": "uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/large.webp", "file_path_thumb": "uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/thumb.webp", "file_path_medium": "uploads/attachments/c09db559-9b29-49d3-9ffa-b75700d7a95d/medium.webp"}	2026-06-24 02:48:51.535-07
c20c6a81-7957-4ff5-b934-cd72a1c5e490	\N	UPDATE	Attachment	23826669-254d-4cbf-b243-35dd65f61530	{"width": null, "height": null, "file_name": "1777462258323-561097579_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/1777462258323-561097579_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "mime_type": null, "created_at": "2026-04-29T11:30:58.326Z", "uploaded_by": null, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 960, "file_name": "1777462258323-561097579_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T11:30:58.326Z", "uploaded_by": null, "attachment_id": "23826669-254d-4cbf-b243-35dd65f61530", "file_path_large": "uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/large.webp", "file_path_thumb": "uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/thumb.webp", "file_path_medium": "uploads/attachments/23826669-254d-4cbf-b243-35dd65f61530/medium.webp"}	2026-06-24 02:48:51.765-07
9e7f705f-e52e-40df-98a3-bb6b1f38712b	\N	UPDATE	Attachment	b9a14b06-705e-4988-88ab-d32f5787dc56	{"width": null, "height": null, "file_name": "1777463539897-492898137_54290.jpg", "file_path": "uploads/attachments/1777463539897-492898137_54290.jpg", "mime_type": null, "created_at": "2026-04-29T11:52:19.920Z", "uploaded_by": null, "attachment_id": "b9a14b06-705e-4988-88ab-d32f5787dc56", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 5301, "height": 5315, "file_name": "1777463539897-492898137_54290.jpg", "file_path": "uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T11:52:19.920Z", "uploaded_by": null, "attachment_id": "b9a14b06-705e-4988-88ab-d32f5787dc56", "file_path_large": "uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/large.webp", "file_path_thumb": "uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/thumb.webp", "file_path_medium": "uploads/attachments/b9a14b06-705e-4988-88ab-d32f5787dc56/medium.webp"}	2026-06-24 02:48:52.661-07
81f7adbd-f8bf-4da6-86e0-ff7b2c763988	\N	UPDATE	Attachment	7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	{"width": null, "height": null, "file_name": "1777464319213-655797989_54290.jpg", "file_path": "uploads/attachments/1777464319213-655797989_54290.jpg", "mime_type": null, "created_at": "2026-04-29T12:05:19.230Z", "uploaded_by": null, "attachment_id": "7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 5301, "height": 5315, "file_name": "1777464319213-655797989_54290.jpg", "file_path": "uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T12:05:19.230Z", "uploaded_by": null, "attachment_id": "7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45", "file_path_large": "uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/large.webp", "file_path_thumb": "uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/thumb.webp", "file_path_medium": "uploads/attachments/7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45/medium.webp"}	2026-06-24 02:48:53.613-07
5e19b0bf-d825-4539-9e35-bd19dc1357bc	\N	UPDATE	Attachment	3afacb79-8d28-4c0d-b6ad-42ac284dad05	{"width": null, "height": null, "file_name": "1777464503395-88029341_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/1777464503395-88029341_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "mime_type": null, "created_at": "2026-04-29T12:08:23.396Z", "uploaded_by": null, "attachment_id": "3afacb79-8d28-4c0d-b6ad-42ac284dad05", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 960, "file_name": "1777464503395-88029341_minister_ministry_of_mines_petroleum_and_natural_gas_cover.jpg", "file_path": "uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T12:08:23.396Z", "uploaded_by": null, "attachment_id": "3afacb79-8d28-4c0d-b6ad-42ac284dad05", "file_path_large": "uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/large.webp", "file_path_thumb": "uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/thumb.webp", "file_path_medium": "uploads/attachments/3afacb79-8d28-4c0d-b6ad-42ac284dad05/medium.webp"}	2026-06-24 02:48:53.842-07
ca65ff7d-80a9-446f-b316-156c18c9873f	\N	UPDATE	Attachment	0db1123d-12cc-4bfe-82d0-5760a7f7e8db	{"width": null, "height": null, "file_name": "1777464503690-388155409_images.png", "file_path": "uploads/attachments/1777464503690-388155409_images.png", "mime_type": null, "created_at": "2026-04-29T12:08:23.691Z", "uploaded_by": null, "attachment_id": "0db1123d-12cc-4bfe-82d0-5760a7f7e8db", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 372, "height": 135, "file_name": "1777464503690-388155409_images.png", "file_path": "uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T12:08:23.691Z", "uploaded_by": null, "attachment_id": "0db1123d-12cc-4bfe-82d0-5760a7f7e8db", "file_path_large": "uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/large.webp", "file_path_thumb": "uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/thumb.webp", "file_path_medium": "uploads/attachments/0db1123d-12cc-4bfe-82d0-5760a7f7e8db/medium.webp"}	2026-06-24 02:48:53.874-07
1c0345f9-bc38-424f-8e79-68204c984cd1	\N	UPDATE	Attachment	9667d5ce-718e-42fd-9cad-db271263a6eb	{"width": null, "height": null, "file_name": "1777464504585-579720602_futuristic-smart-city-with-5g-global-network-technology.jpg", "file_path": "uploads/attachments/1777464504585-579720602_futuristic-smart-city-with-5g-global-network-technology.jpg", "mime_type": null, "created_at": "2026-04-29T12:08:24.632Z", "uploaded_by": null, "attachment_id": "9667d5ce-718e-42fd-9cad-db271263a6eb", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 4391, "height": 2927, "file_name": "1777464504585-579720602_futuristic-smart-city-with-5g-global-network-technology.jpg", "file_path": "uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/large.webp", "mime_type": "image/webp", "created_at": "2026-04-29T12:08:24.632Z", "uploaded_by": null, "attachment_id": "9667d5ce-718e-42fd-9cad-db271263a6eb", "file_path_large": "uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/large.webp", "file_path_thumb": "uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/thumb.webp", "file_path_medium": "uploads/attachments/9667d5ce-718e-42fd-9cad-db271263a6eb/medium.webp"}	2026-06-24 02:48:54.806-07
778f3c70-511a-46e6-8c7b-7cd8b6339f21	\N	UPDATE	Attachment	eaa30a4e-8d65-4315-9db3-7e0c2646681f	{"width": null, "height": null, "file_name": "1777880869064-836538035_4.png", "file_path": "uploads/attachments/1777880869064-836538035_4.png", "mime_type": null, "created_at": "2026-05-04T07:47:49.080Z", "uploaded_by": null, "attachment_id": "eaa30a4e-8d65-4315-9db3-7e0c2646681f", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1620, "height": 1620, "file_name": "1777880869064-836538035_4.png", "file_path": "uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T07:47:49.080Z", "uploaded_by": null, "attachment_id": "eaa30a4e-8d65-4315-9db3-7e0c2646681f", "file_path_large": "uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/large.webp", "file_path_thumb": "uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/thumb.webp", "file_path_medium": "uploads/attachments/eaa30a4e-8d65-4315-9db3-7e0c2646681f/medium.webp"}	2026-06-24 02:48:55.144-07
6e511a4a-9962-43df-9e28-6e776e8b9ece	\N	UPDATE	Attachment	bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5	{"width": null, "height": null, "file_name": "1777880993442-375407335_4.png", "file_path": "uploads/attachments/1777880993442-375407335_4.png", "mime_type": null, "created_at": "2026-05-04T07:49:53.458Z", "uploaded_by": null, "attachment_id": "bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1620, "height": 1620, "file_name": "1777880993442-375407335_4.png", "file_path": "uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T07:49:53.458Z", "uploaded_by": null, "attachment_id": "bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5", "file_path_large": "uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/large.webp", "file_path_thumb": "uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/thumb.webp", "file_path_medium": "uploads/attachments/bbda34ac-e0fe-4e3c-b2ad-c3fbc46dc2a5/medium.webp"}	2026-06-24 02:48:55.481-07
aab92c9d-78c8-40fa-92b4-6783ff31b9f2	\N	UPDATE	Attachment	30b8514a-5df6-459b-8a88-f122d28f3820	{"width": null, "height": null, "file_name": "1777881032210-652444803_3.png", "file_path": "uploads/attachments/1777881032210-652444803_3.png", "mime_type": null, "created_at": "2026-05-04T07:50:32.228Z", "uploaded_by": null, "attachment_id": "30b8514a-5df6-459b-8a88-f122d28f3820", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1620, "height": 1620, "file_name": "1777881032210-652444803_3.png", "file_path": "uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T07:50:32.228Z", "uploaded_by": null, "attachment_id": "30b8514a-5df6-459b-8a88-f122d28f3820", "file_path_large": "uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/large.webp", "file_path_thumb": "uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/thumb.webp", "file_path_medium": "uploads/attachments/30b8514a-5df6-459b-8a88-f122d28f3820/medium.webp"}	2026-06-24 02:48:55.805-07
aab1953a-d27e-42e9-9f73-aa0047815626	\N	UPDATE	Attachment	cc26cba9-36e4-4d77-bc9d-daf628d5b05d	{"width": null, "height": null, "file_name": "1777881124428-266870959_4.png", "file_path": "uploads/attachments/1777881124428-266870959_4.png", "mime_type": null, "created_at": "2026-05-04T07:52:04.445Z", "uploaded_by": null, "attachment_id": "cc26cba9-36e4-4d77-bc9d-daf628d5b05d", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1620, "height": 1620, "file_name": "1777881124428-266870959_4.png", "file_path": "uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T07:52:04.445Z", "uploaded_by": null, "attachment_id": "cc26cba9-36e4-4d77-bc9d-daf628d5b05d", "file_path_large": "uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/large.webp", "file_path_thumb": "uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/thumb.webp", "file_path_medium": "uploads/attachments/cc26cba9-36e4-4d77-bc9d-daf628d5b05d/medium.webp"}	2026-06-24 02:48:56.144-07
3f308d5e-d3a1-4d7c-a4ec-2a0f53907037	\N	UPDATE	Attachment	73053c12-06cc-42f8-8d38-bda4036df6b4	{"width": null, "height": null, "file_name": "1777881903729-899115261_4.png", "file_path": "uploads/attachments/1777881903729-899115261_4.png", "mime_type": null, "created_at": "2026-05-04T08:05:03.745Z", "uploaded_by": null, "attachment_id": "73053c12-06cc-42f8-8d38-bda4036df6b4", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1620, "height": 1620, "file_name": "1777881903729-899115261_4.png", "file_path": "uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T08:05:03.745Z", "uploaded_by": null, "attachment_id": "73053c12-06cc-42f8-8d38-bda4036df6b4", "file_path_large": "uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/large.webp", "file_path_thumb": "uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/thumb.webp", "file_path_medium": "uploads/attachments/73053c12-06cc-42f8-8d38-bda4036df6b4/medium.webp"}	2026-06-24 02:48:56.473-07
5b714fc6-3630-4dc3-9524-7c34cddaf379	\N	UPDATE	Attachment	c7d890ba-0b67-4b77-be32-533d7b98409d	{"width": null, "height": null, "file_name": "1777881909469-765756976_3.png", "file_path": "uploads/attachments/1777881909469-765756976_3.png", "mime_type": null, "created_at": "2026-05-04T08:05:09.481Z", "uploaded_by": null, "attachment_id": "c7d890ba-0b67-4b77-be32-533d7b98409d", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1620, "height": 1620, "file_name": "1777881909469-765756976_3.png", "file_path": "uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T08:05:09.481Z", "uploaded_by": null, "attachment_id": "c7d890ba-0b67-4b77-be32-533d7b98409d", "file_path_large": "uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/large.webp", "file_path_thumb": "uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/thumb.webp", "file_path_medium": "uploads/attachments/c7d890ba-0b67-4b77-be32-533d7b98409d/medium.webp"}	2026-06-24 02:48:56.792-07
b117b6f7-a1a1-4b5d-8927-ce879c1aa9b6	\N	UPDATE	Attachment	a293e86e-5588-408f-9d86-19ff9b5b59f1	{"width": null, "height": null, "file_name": "1777883490273-873417009_Untitled_design__2_-removebg-preview.png", "file_path": "uploads/attachments/1777883490273-873417009_Untitled_design__2_-removebg-preview.png", "mime_type": null, "created_at": "2026-05-04T08:31:30.277Z", "uploaded_by": null, "attachment_id": "a293e86e-5588-408f-9d86-19ff9b5b59f1", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 500, "height": 500, "file_name": "1777883490273-873417009_Untitled_design__2_-removebg-preview.png", "file_path": "uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T08:31:30.277Z", "uploaded_by": null, "attachment_id": "a293e86e-5588-408f-9d86-19ff9b5b59f1", "file_path_large": "uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/large.webp", "file_path_thumb": "uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/thumb.webp", "file_path_medium": "uploads/attachments/a293e86e-5588-408f-9d86-19ff9b5b59f1/medium.webp"}	2026-06-24 02:48:56.905-07
8a88ad7b-53a0-4f10-9a5c-2460e000c388	\N	UPDATE	Attachment	b11e85c1-3f80-467a-b2dc-706420e46820	{"width": null, "height": null, "file_name": "1777883503274-50550617_7.png", "file_path": "uploads/attachments/1777883503274-50550617_7.png", "mime_type": null, "created_at": "2026-05-04T08:31:43.277Z", "uploaded_by": null, "attachment_id": "b11e85c1-3f80-467a-b2dc-706420e46820", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 994, "height": 994, "file_name": "1777883503274-50550617_7.png", "file_path": "uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T08:31:43.277Z", "uploaded_by": null, "attachment_id": "b11e85c1-3f80-467a-b2dc-706420e46820", "file_path_large": "uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/large.webp", "file_path_thumb": "uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/thumb.webp", "file_path_medium": "uploads/attachments/b11e85c1-3f80-467a-b2dc-706420e46820/medium.webp"}	2026-06-24 02:48:57.364-07
1bfe45fe-d909-4634-9295-ede6bb4e93c3	\N	UPDATE	Attachment	5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3	{"width": null, "height": null, "file_name": "1777884514599-530251790_logo-only.png", "file_path": "uploads/attachments/1777884514599-530251790_logo-only.png", "mime_type": null, "created_at": "2026-05-04T08:48:34.604Z", "uploaded_by": null, "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 994, "height": 994, "file_name": "1777884514599-530251790_logo-only.png", "file_path": "uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T08:48:34.604Z", "uploaded_by": null, "attachment_id": "5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3", "file_path_large": "uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/large.webp", "file_path_thumb": "uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/thumb.webp", "file_path_medium": "uploads/attachments/5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3/medium.webp"}	2026-06-24 02:48:57.766-07
0d6e2e04-7cc7-4cbc-a725-bfabae1ca3b1	\N	UPDATE	Attachment	b36de25f-97ce-4dbe-b519-2eaa95841380	{"width": null, "height": null, "file_name": "1777885185377-528180847_asm.png", "file_path": "uploads/attachments/1777885185377-528180847_asm.png", "mime_type": null, "created_at": "2026-05-04T08:59:45.380Z", "uploaded_by": null, "attachment_id": "b36de25f-97ce-4dbe-b519-2eaa95841380", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 752, "height": 474, "file_name": "1777885185377-528180847_asm.png", "file_path": "uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T08:59:45.380Z", "uploaded_by": null, "attachment_id": "b36de25f-97ce-4dbe-b519-2eaa95841380", "file_path_large": "uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/large.webp", "file_path_thumb": "uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/thumb.webp", "file_path_medium": "uploads/attachments/b36de25f-97ce-4dbe-b519-2eaa95841380/medium.webp"}	2026-06-24 02:48:57.844-07
18986a92-7130-4d5d-a7e2-e7b0002eb2c1	\N	UPDATE	Attachment	3a4411a9-987b-4d7a-a0a8-0edbc9a2413f	{"width": null, "height": null, "file_name": "1777886019894-857160170_unsdg.png", "file_path": "uploads/attachments/1777886019894-857160170_unsdg.png", "mime_type": null, "created_at": "2026-05-04T09:13:39.902Z", "uploaded_by": null, "attachment_id": "3a4411a9-987b-4d7a-a0a8-0edbc9a2413f", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 940, "height": 753, "file_name": "1777886019894-857160170_unsdg.png", "file_path": "uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T09:13:39.902Z", "uploaded_by": null, "attachment_id": "3a4411a9-987b-4d7a-a0a8-0edbc9a2413f", "file_path_large": "uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/large.webp", "file_path_thumb": "uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/thumb.webp", "file_path_medium": "uploads/attachments/3a4411a9-987b-4d7a-a0a8-0edbc9a2413f/medium.webp"}	2026-06-24 02:48:57.994-07
c5784795-695b-433e-89a6-ab21a57f7583	\N	UPDATE	Attachment	0322a67e-278b-4f25-a8e2-5011df89ee7c	{"width": null, "height": null, "file_name": "1777886077458-39254568_agenda.png", "file_path": "uploads/attachments/1777886077458-39254568_agenda.png", "mime_type": null, "created_at": "2026-05-04T09:14:37.464Z", "uploaded_by": null, "attachment_id": "0322a67e-278b-4f25-a8e2-5011df89ee7c", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 940, "height": 593, "file_name": "1777886077458-39254568_agenda.png", "file_path": "uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T09:14:37.464Z", "uploaded_by": null, "attachment_id": "0322a67e-278b-4f25-a8e2-5011df89ee7c", "file_path_large": "uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/large.webp", "file_path_thumb": "uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/thumb.webp", "file_path_medium": "uploads/attachments/0322a67e-278b-4f25-a8e2-5011df89ee7c/medium.webp"}	2026-06-24 02:48:58.124-07
cc565052-6633-4715-b726-f7585e784e45	\N	UPDATE	Attachment	5cb418a7-eb11-42a3-9bc7-b2512a5c4518	{"width": null, "height": null, "file_name": "1777886101941-651639821_comesa.png", "file_path": "uploads/attachments/1777886101941-651639821_comesa.png", "mime_type": null, "created_at": "2026-05-04T09:15:01.944Z", "uploaded_by": null, "attachment_id": "5cb418a7-eb11-42a3-9bc7-b2512a5c4518", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 940, "height": 940, "file_name": "1777886101941-651639821_comesa.png", "file_path": "uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/large.webp", "mime_type": "image/webp", "created_at": "2026-05-04T09:15:01.944Z", "uploaded_by": null, "attachment_id": "5cb418a7-eb11-42a3-9bc7-b2512a5c4518", "file_path_large": "uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/large.webp", "file_path_thumb": "uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/thumb.webp", "file_path_medium": "uploads/attachments/5cb418a7-eb11-42a3-9bc7-b2512a5c4518/medium.webp"}	2026-06-24 02:48:58.277-07
cbc6e27b-5083-44a0-9e2d-f0003f010241	\N	UPDATE	Attachment	2f361f67-0df0-48cb-9abd-ccb0d1d2c112	{"width": null, "height": null, "file_name": "1778049679245-65150776_photo_2026-05-06_09-39-45.jpg", "file_path": "uploads/attachments/1778049679245-65150776_photo_2026-05-06_09-39-45.jpg", "mime_type": null, "created_at": "2026-05-06T06:41:19.248Z", "uploaded_by": null, "attachment_id": "2f361f67-0df0-48cb-9abd-ccb0d1d2c112", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 960, "file_name": "1778049679245-65150776_photo_2026-05-06_09-39-45.jpg", "file_path": "uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:41:19.248Z", "uploaded_by": null, "attachment_id": "2f361f67-0df0-48cb-9abd-ccb0d1d2c112", "file_path_large": "uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/large.webp", "file_path_thumb": "uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/thumb.webp", "file_path_medium": "uploads/attachments/2f361f67-0df0-48cb-9abd-ccb0d1d2c112/medium.webp"}	2026-06-24 02:48:58.53-07
8e156ed2-3d27-4510-9ba1-36a1317e6307	\N	UPDATE	Attachment	aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9	{"width": null, "height": null, "file_name": "1778049679275-131017428_photo_2026-05-06_09-40-12.jpg", "file_path": "uploads/attachments/1778049679275-131017428_photo_2026-05-06_09-40-12.jpg", "mime_type": null, "created_at": "2026-05-06T06:41:19.278Z", "uploaded_by": null, "attachment_id": "aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 987, "file_name": "1778049679275-131017428_photo_2026-05-06_09-40-12.jpg", "file_path": "uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:41:19.278Z", "uploaded_by": null, "attachment_id": "aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9", "file_path_large": "uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/large.webp", "file_path_thumb": "uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/thumb.webp", "file_path_medium": "uploads/attachments/aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9/medium.webp"}	2026-06-24 02:48:58.789-07
e136f5c5-e844-4b4b-9550-4f41058cb202	\N	UPDATE	Attachment	b1f0f275-2d70-40be-8058-bf042e0dce71	{"width": null, "height": null, "file_name": "1778049679308-443159849_photo_2026-05-06_09-40-17.jpg", "file_path": "uploads/attachments/1778049679308-443159849_photo_2026-05-06_09-40-17.jpg", "mime_type": null, "created_at": "2026-05-06T06:41:19.311Z", "uploaded_by": null, "attachment_id": "b1f0f275-2d70-40be-8058-bf042e0dce71", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 950, "file_name": "1778049679308-443159849_photo_2026-05-06_09-40-17.jpg", "file_path": "uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:41:19.311Z", "uploaded_by": null, "attachment_id": "b1f0f275-2d70-40be-8058-bf042e0dce71", "file_path_large": "uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/large.webp", "file_path_thumb": "uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/thumb.webp", "file_path_medium": "uploads/attachments/b1f0f275-2d70-40be-8058-bf042e0dce71/medium.webp"}	2026-06-24 02:48:59.072-07
cce4b041-a1ce-4eea-9585-dc1eca5942c5	\N	UPDATE	Attachment	0c5d4592-4f0d-4d39-89d4-df1191b7a686	{"width": null, "height": null, "file_name": "1778049679348-418782620_photo_2026-05-06_09-40-27.jpg", "file_path": "uploads/attachments/1778049679348-418782620_photo_2026-05-06_09-40-27.jpg", "mime_type": null, "created_at": "2026-05-06T06:41:19.352Z", "uploaded_by": null, "attachment_id": "0c5d4592-4f0d-4d39-89d4-df1191b7a686", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 1013, "file_name": "1778049679348-418782620_photo_2026-05-06_09-40-27.jpg", "file_path": "uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:41:19.352Z", "uploaded_by": null, "attachment_id": "0c5d4592-4f0d-4d39-89d4-df1191b7a686", "file_path_large": "uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/large.webp", "file_path_thumb": "uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/thumb.webp", "file_path_medium": "uploads/attachments/0c5d4592-4f0d-4d39-89d4-df1191b7a686/medium.webp"}	2026-06-24 02:48:59.359-07
69be3d72-19a7-4a43-ad80-c0b9552e9ba8	\N	UPDATE	Attachment	da265c30-bbba-4295-9210-4178647a231b	{"width": null, "height": null, "file_name": "1778049679350-286971131_photo_2026-05-06_09-40-21.jpg", "file_path": "uploads/attachments/1778049679350-286971131_photo_2026-05-06_09-40-21.jpg", "mime_type": null, "created_at": "2026-05-06T06:41:19.353Z", "uploaded_by": null, "attachment_id": "da265c30-bbba-4295-9210-4178647a231b", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 614, "file_name": "1778049679350-286971131_photo_2026-05-06_09-40-21.jpg", "file_path": "uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:41:19.353Z", "uploaded_by": null, "attachment_id": "da265c30-bbba-4295-9210-4178647a231b", "file_path_large": "uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/large.webp", "file_path_thumb": "uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/thumb.webp", "file_path_medium": "uploads/attachments/da265c30-bbba-4295-9210-4178647a231b/medium.webp"}	2026-06-24 02:48:59.547-07
7f0efd39-c7ca-48e1-b506-31afb3e73c80	\N	UPDATE	Attachment	ec5d35bf-3484-4c20-961b-b4d391f7586c	{"width": null, "height": null, "file_name": "1778050010589-574080062_photo_2026-05-06_09-46-20.jpg", "file_path": "uploads/attachments/1778050010589-574080062_photo_2026-05-06_09-46-20.jpg", "mime_type": null, "created_at": "2026-05-06T06:46:50.591Z", "uploaded_by": null, "attachment_id": "ec5d35bf-3484-4c20-961b-b4d391f7586c", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050010589-574080062_photo_2026-05-06_09-46-20.jpg", "file_path": "uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:46:50.591Z", "uploaded_by": null, "attachment_id": "ec5d35bf-3484-4c20-961b-b4d391f7586c", "file_path_large": "uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/large.webp", "file_path_thumb": "uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/thumb.webp", "file_path_medium": "uploads/attachments/ec5d35bf-3484-4c20-961b-b4d391f7586c/medium.webp"}	2026-06-24 02:48:59.746-07
b46861c9-e1f6-4833-bd50-a1ea1f089dcf	\N	UPDATE	Attachment	2f32c542-dbd8-44a8-b273-487c4b0dfd94	{"width": null, "height": null, "file_name": "1778050091681-374796025_photo_2026-05-06_09-46-20.jpg", "file_path": "uploads/attachments/1778050091681-374796025_photo_2026-05-06_09-46-20.jpg", "mime_type": null, "created_at": "2026-05-06T06:48:11.684Z", "uploaded_by": null, "attachment_id": "2f32c542-dbd8-44a8-b273-487c4b0dfd94", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050091681-374796025_photo_2026-05-06_09-46-20.jpg", "file_path": "uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:48:11.684Z", "uploaded_by": null, "attachment_id": "2f32c542-dbd8-44a8-b273-487c4b0dfd94", "file_path_large": "uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/large.webp", "file_path_thumb": "uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/thumb.webp", "file_path_medium": "uploads/attachments/2f32c542-dbd8-44a8-b273-487c4b0dfd94/medium.webp"}	2026-06-24 02:48:59.965-07
e86d0a9c-e2e4-46d7-b4b1-67fe275938dc	\N	UPDATE	Attachment	bf4fa4d0-de4a-42a9-8b05-d5e86ba68569	{"width": null, "height": null, "file_name": "1778050463930-657401390_photo_2026-05-06_09-53-28.jpg", "file_path": "uploads/attachments/1778050463930-657401390_photo_2026-05-06_09-53-28.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:23.932Z", "uploaded_by": null, "attachment_id": "bf4fa4d0-de4a-42a9-8b05-d5e86ba68569", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050463930-657401390_photo_2026-05-06_09-53-28.jpg", "file_path": "uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:23.932Z", "uploaded_by": null, "attachment_id": "bf4fa4d0-de4a-42a9-8b05-d5e86ba68569", "file_path_large": "uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/large.webp", "file_path_thumb": "uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/thumb.webp", "file_path_medium": "uploads/attachments/bf4fa4d0-de4a-42a9-8b05-d5e86ba68569/medium.webp"}	2026-06-24 02:49:00.222-07
69adab41-5ad8-484b-9c20-4abb1afcef6b	\N	UPDATE	Attachment	e05d8984-7cec-4f45-9210-8b8bf89e57f6	{"width": null, "height": null, "file_name": "1778050463999-826829435_photo_2026-05-06_09-53-48.jpg", "file_path": "uploads/attachments/1778050463999-826829435_photo_2026-05-06_09-53-48.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:24.002Z", "uploaded_by": null, "attachment_id": "e05d8984-7cec-4f45-9210-8b8bf89e57f6", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050463999-826829435_photo_2026-05-06_09-53-48.jpg", "file_path": "uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:24.002Z", "uploaded_by": null, "attachment_id": "e05d8984-7cec-4f45-9210-8b8bf89e57f6", "file_path_large": "uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/large.webp", "file_path_thumb": "uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/thumb.webp", "file_path_medium": "uploads/attachments/e05d8984-7cec-4f45-9210-8b8bf89e57f6/medium.webp"}	2026-06-24 02:49:00.494-07
2edc5357-24c1-4f89-80a3-e059dff1adfb	\N	UPDATE	Attachment	9fd1eb29-7cb4-4c9a-b394-1911f92f07b1	{"width": null, "height": null, "file_name": "1778050464009-912461945_photo_2026-05-06_09-54-00.jpg", "file_path": "uploads/attachments/1778050464009-912461945_photo_2026-05-06_09-54-00.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:24.011Z", "uploaded_by": null, "attachment_id": "9fd1eb29-7cb4-4c9a-b394-1911f92f07b1", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 647, "file_name": "1778050464009-912461945_photo_2026-05-06_09-54-00.jpg", "file_path": "uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:24.011Z", "uploaded_by": null, "attachment_id": "9fd1eb29-7cb4-4c9a-b394-1911f92f07b1", "file_path_large": "uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/large.webp", "file_path_thumb": "uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/thumb.webp", "file_path_medium": "uploads/attachments/9fd1eb29-7cb4-4c9a-b394-1911f92f07b1/medium.webp"}	2026-06-24 02:49:00.698-07
23623655-4f16-4345-b4e2-4e6a68b2f2df	\N	UPDATE	Attachment	95791248-c580-4f26-95fe-3a7abba27676	{"width": null, "height": null, "file_name": "1778050464010-57329322_photo_2026-05-06_09-53-43.jpg", "file_path": "uploads/attachments/1778050464010-57329322_photo_2026-05-06_09-53-43.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:24.013Z", "uploaded_by": null, "attachment_id": "95791248-c580-4f26-95fe-3a7abba27676", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050464010-57329322_photo_2026-05-06_09-53-43.jpg", "file_path": "uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:24.013Z", "uploaded_by": null, "attachment_id": "95791248-c580-4f26-95fe-3a7abba27676", "file_path_large": "uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/large.webp", "file_path_thumb": "uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/thumb.webp", "file_path_medium": "uploads/attachments/95791248-c580-4f26-95fe-3a7abba27676/medium.webp"}	2026-06-24 02:49:00.988-07
385d1bbf-952d-4032-936e-1941990ac96c	\N	UPDATE	Attachment	d8b81d23-4ca8-4240-8261-b43b907160b2	{"width": null, "height": null, "file_name": "1778050464019-39263597_photo_2026-05-06_09-53-57.jpg", "file_path": "uploads/attachments/1778050464019-39263597_photo_2026-05-06_09-53-57.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:24.022Z", "uploaded_by": null, "attachment_id": "d8b81d23-4ca8-4240-8261-b43b907160b2", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 837, "file_name": "1778050464019-39263597_photo_2026-05-06_09-53-57.jpg", "file_path": "uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:24.022Z", "uploaded_by": null, "attachment_id": "d8b81d23-4ca8-4240-8261-b43b907160b2", "file_path_large": "uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/large.webp", "file_path_thumb": "uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/thumb.webp", "file_path_medium": "uploads/attachments/d8b81d23-4ca8-4240-8261-b43b907160b2/medium.webp"}	2026-06-24 02:49:01.207-07
7cfa3ced-d048-4ba8-b0cc-0b393296a01f	\N	UPDATE	Attachment	404ac6db-b2fc-43b8-95ad-7436451675dc	{"width": null, "height": null, "file_name": "1778050464051-639965731_photo_2026-05-06_09-54-04.jpg", "file_path": "uploads/attachments/1778050464051-639965731_photo_2026-05-06_09-54-04.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:24.052Z", "uploaded_by": null, "attachment_id": "404ac6db-b2fc-43b8-95ad-7436451675dc", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050464051-639965731_photo_2026-05-06_09-54-04.jpg", "file_path": "uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:24.052Z", "uploaded_by": null, "attachment_id": "404ac6db-b2fc-43b8-95ad-7436451675dc", "file_path_large": "uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/large.webp", "file_path_thumb": "uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/thumb.webp", "file_path_medium": "uploads/attachments/404ac6db-b2fc-43b8-95ad-7436451675dc/medium.webp"}	2026-06-24 02:49:01.453-07
0b83c510-e626-4858-9c0b-fc71013d3f50	\N	UPDATE	Attachment	e72072dd-1024-4306-a671-7936c22589a7	{"width": null, "height": null, "file_name": "1778050464080-949460906_photo_2026-05-06_09-54-07.jpg", "file_path": "uploads/attachments/1778050464080-949460906_photo_2026-05-06_09-54-07.jpg", "mime_type": null, "created_at": "2026-05-06T06:54:24.081Z", "uploaded_by": null, "attachment_id": "e72072dd-1024-4306-a671-7936c22589a7", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 853, "file_name": "1778050464080-949460906_photo_2026-05-06_09-54-07.jpg", "file_path": "uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T06:54:24.081Z", "uploaded_by": null, "attachment_id": "e72072dd-1024-4306-a671-7936c22589a7", "file_path_large": "uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/large.webp", "file_path_thumb": "uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/thumb.webp", "file_path_medium": "uploads/attachments/e72072dd-1024-4306-a671-7936c22589a7/medium.webp"}	2026-06-24 02:49:01.724-07
83cc81c3-7049-4294-a28b-eac49e9420e4	\N	UPDATE	Attachment	3f0839c6-8870-4825-b16d-0abb7374f1df	{"width": null, "height": null, "file_name": "1778051053720-231975946_photo_2026-05-06_10-03-48.jpg", "file_path": "uploads/attachments/1778051053720-231975946_photo_2026-05-06_10-03-48.jpg", "mime_type": null, "created_at": "2026-05-06T07:04:13.723Z", "uploaded_by": null, "attachment_id": "3f0839c6-8870-4825-b16d-0abb7374f1df", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 887, "file_name": "1778051053720-231975946_photo_2026-05-06_10-03-48.jpg", "file_path": "uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:04:13.723Z", "uploaded_by": null, "attachment_id": "3f0839c6-8870-4825-b16d-0abb7374f1df", "file_path_large": "uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/large.webp", "file_path_thumb": "uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/thumb.webp", "file_path_medium": "uploads/attachments/3f0839c6-8870-4825-b16d-0abb7374f1df/medium.webp"}	2026-06-24 02:49:01.929-07
014c7879-0c28-434e-a4f8-c34b9924e5fb	\N	UPDATE	Attachment	5028c83b-3d00-4256-98cb-ee8ac98b5a01	{"width": null, "height": null, "file_name": "1778051070982-793945096_photo_2026-05-06_10-03-21.jpg", "file_path": "uploads/attachments/1778051070982-793945096_photo_2026-05-06_10-03-21.jpg", "mime_type": null, "created_at": "2026-05-06T07:04:30.984Z", "uploaded_by": null, "attachment_id": "5028c83b-3d00-4256-98cb-ee8ac98b5a01", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 769, "file_name": "1778051070982-793945096_photo_2026-05-06_10-03-21.jpg", "file_path": "uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:04:30.984Z", "uploaded_by": null, "attachment_id": "5028c83b-3d00-4256-98cb-ee8ac98b5a01", "file_path_large": "uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/large.webp", "file_path_thumb": "uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/thumb.webp", "file_path_medium": "uploads/attachments/5028c83b-3d00-4256-98cb-ee8ac98b5a01/medium.webp"}	2026-06-24 02:49:02.134-07
0a8e2413-7ce8-45b9-828a-b0db8c70461d	\N	UPDATE	Attachment	4bd767e5-b064-473d-8516-d29675c528d2	{"width": null, "height": null, "file_name": "1778051070997-192801565_photo_2026-05-06_10-03-44.jpg", "file_path": "uploads/attachments/1778051070997-192801565_photo_2026-05-06_10-03-44.jpg", "mime_type": null, "created_at": "2026-05-06T07:04:31.000Z", "uploaded_by": null, "attachment_id": "4bd767e5-b064-473d-8516-d29675c528d2", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 664, "file_name": "1778051070997-192801565_photo_2026-05-06_10-03-44.jpg", "file_path": "uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:04:31.000Z", "uploaded_by": null, "attachment_id": "4bd767e5-b064-473d-8516-d29675c528d2", "file_path_large": "uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/large.webp", "file_path_thumb": "uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/thumb.webp", "file_path_medium": "uploads/attachments/4bd767e5-b064-473d-8516-d29675c528d2/medium.webp"}	2026-06-24 02:49:02.32-07
e5726e27-03fd-4194-8440-f299c60e5e8e	\N	UPDATE	Attachment	863c82dc-5406-4a4a-83da-305c0537a65b	{"width": null, "height": null, "file_name": "1778051071040-51896687_photo_2026-05-06_10-03-52.jpg", "file_path": "uploads/attachments/1778051071040-51896687_photo_2026-05-06_10-03-52.jpg", "mime_type": null, "created_at": "2026-05-06T07:04:31.042Z", "uploaded_by": null, "attachment_id": "863c82dc-5406-4a4a-83da-305c0537a65b", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 783, "file_name": "1778051071040-51896687_photo_2026-05-06_10-03-52.jpg", "file_path": "uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:04:31.042Z", "uploaded_by": null, "attachment_id": "863c82dc-5406-4a4a-83da-305c0537a65b", "file_path_large": "uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/large.webp", "file_path_thumb": "uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/thumb.webp", "file_path_medium": "uploads/attachments/863c82dc-5406-4a4a-83da-305c0537a65b/medium.webp"}	2026-06-24 02:49:02.507-07
6631c3f2-5c19-492f-9abd-dd8d41a508f9	\N	UPDATE	Attachment	48ce37d2-bc37-44d6-91c1-462720a75e99	{"width": null, "height": null, "file_name": "1778051071042-567117279_photo_2026-05-06_10-03-54.jpg", "file_path": "uploads/attachments/1778051071042-567117279_photo_2026-05-06_10-03-54.jpg", "mime_type": null, "created_at": "2026-05-06T07:04:31.044Z", "uploaded_by": null, "attachment_id": "48ce37d2-bc37-44d6-91c1-462720a75e99", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 862, "file_name": "1778051071042-567117279_photo_2026-05-06_10-03-54.jpg", "file_path": "uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:04:31.044Z", "uploaded_by": null, "attachment_id": "48ce37d2-bc37-44d6-91c1-462720a75e99", "file_path_large": "uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/large.webp", "file_path_thumb": "uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/thumb.webp", "file_path_medium": "uploads/attachments/48ce37d2-bc37-44d6-91c1-462720a75e99/medium.webp"}	2026-06-24 02:49:02.711-07
d1b78fab-5b37-4c45-89cd-24293c58e68c	\N	UPDATE	Attachment	5ea5261e-d990-4838-9a28-58f1aa79b6cf	{"width": null, "height": null, "file_name": "1778051361336-463629095_photo_2026-05-06_10-08-32.jpg", "file_path": "uploads/attachments/1778051361336-463629095_photo_2026-05-06_10-08-32.jpg", "mime_type": null, "created_at": "2026-05-06T07:09:21.340Z", "uploaded_by": null, "attachment_id": "5ea5261e-d990-4838-9a28-58f1aa79b6cf", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 912, "file_name": "1778051361336-463629095_photo_2026-05-06_10-08-32.jpg", "file_path": "uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:09:21.340Z", "uploaded_by": null, "attachment_id": "5ea5261e-d990-4838-9a28-58f1aa79b6cf", "file_path_large": "uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/large.webp", "file_path_thumb": "uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/thumb.webp", "file_path_medium": "uploads/attachments/5ea5261e-d990-4838-9a28-58f1aa79b6cf/medium.webp"}	2026-06-24 02:49:02.937-07
21f5971f-3276-4300-ac52-afead91a1ee8	\N	UPDATE	Attachment	0f05c40d-ecef-45b6-8822-3d2f0dffe345	{"width": null, "height": null, "file_name": "1778051368909-698526959_photo_2026-05-06_10-08-38.jpg", "file_path": "uploads/attachments/1778051368909-698526959_photo_2026-05-06_10-08-38.jpg", "mime_type": null, "created_at": "2026-05-06T07:09:28.910Z", "uploaded_by": null, "attachment_id": "0f05c40d-ecef-45b6-8822-3d2f0dffe345", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 1169, "file_name": "1778051368909-698526959_photo_2026-05-06_10-08-38.jpg", "file_path": "uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:09:28.910Z", "uploaded_by": null, "attachment_id": "0f05c40d-ecef-45b6-8822-3d2f0dffe345", "file_path_large": "uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/large.webp", "file_path_thumb": "uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/thumb.webp", "file_path_medium": "uploads/attachments/0f05c40d-ecef-45b6-8822-3d2f0dffe345/medium.webp"}	2026-06-24 02:49:03.287-07
8663c947-d075-410f-93d5-f58df193637d	\N	UPDATE	Attachment	7b4c84a9-88a8-4067-b83e-c8e967189bf4	{"width": null, "height": null, "file_name": "1778051368923-459913217_photo_2026-05-06_10-08-43.jpg", "file_path": "uploads/attachments/1778051368923-459913217_photo_2026-05-06_10-08-43.jpg", "mime_type": null, "created_at": "2026-05-06T07:09:28.924Z", "uploaded_by": null, "attachment_id": "7b4c84a9-88a8-4067-b83e-c8e967189bf4", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 811, "file_name": "1778051368923-459913217_photo_2026-05-06_10-08-43.jpg", "file_path": "uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:09:28.924Z", "uploaded_by": null, "attachment_id": "7b4c84a9-88a8-4067-b83e-c8e967189bf4", "file_path_large": "uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/large.webp", "file_path_thumb": "uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/thumb.webp", "file_path_medium": "uploads/attachments/7b4c84a9-88a8-4067-b83e-c8e967189bf4/medium.webp"}	2026-06-24 02:49:03.535-07
0833ae99-49a3-48b1-8dda-b0ee2d5b1147	\N	UPDATE	Attachment	ddeba2d0-a17e-4251-8d08-55c1f8945841	{"width": null, "height": null, "file_name": "1778051368947-876091022_photo_2026-05-06_10-08-48.jpg", "file_path": "uploads/attachments/1778051368947-876091022_photo_2026-05-06_10-08-48.jpg", "mime_type": null, "created_at": "2026-05-06T07:09:28.953Z", "uploaded_by": null, "attachment_id": "ddeba2d0-a17e-4251-8d08-55c1f8945841", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 745, "file_name": "1778051368947-876091022_photo_2026-05-06_10-08-48.jpg", "file_path": "uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:09:28.953Z", "uploaded_by": null, "attachment_id": "ddeba2d0-a17e-4251-8d08-55c1f8945841", "file_path_large": "uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/large.webp", "file_path_thumb": "uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/thumb.webp", "file_path_medium": "uploads/attachments/ddeba2d0-a17e-4251-8d08-55c1f8945841/medium.webp"}	2026-06-24 02:49:03.716-07
e7485a14-19e9-4051-a99f-2ac148dd8091	\N	UPDATE	Attachment	e37ae1be-549b-40b3-bed0-6bb05cce942f	{"width": null, "height": null, "file_name": "1778051368951-165305823_photo_2026-05-06_10-08-56.jpg", "file_path": "uploads/attachments/1778051368951-165305823_photo_2026-05-06_10-08-56.jpg", "mime_type": null, "created_at": "2026-05-06T07:09:28.957Z", "uploaded_by": null, "attachment_id": "e37ae1be-549b-40b3-bed0-6bb05cce942f", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 917, "file_name": "1778051368951-165305823_photo_2026-05-06_10-08-56.jpg", "file_path": "uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:09:28.957Z", "uploaded_by": null, "attachment_id": "e37ae1be-549b-40b3-bed0-6bb05cce942f", "file_path_large": "uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/large.webp", "file_path_thumb": "uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/thumb.webp", "file_path_medium": "uploads/attachments/e37ae1be-549b-40b3-bed0-6bb05cce942f/medium.webp"}	2026-06-24 02:49:03.966-07
9c7a8fae-ea97-4a7d-8db0-d67e61bf87c7	\N	UPDATE	Attachment	1e68b79c-9fc7-4feb-944f-4a812533c9f6	{"width": null, "height": null, "file_name": "1778051368956-625091960_photo_2026-05-06_10-08-59.jpg", "file_path": "uploads/attachments/1778051368956-625091960_photo_2026-05-06_10-08-59.jpg", "mime_type": null, "created_at": "2026-05-06T07:09:28.961Z", "uploaded_by": null, "attachment_id": "1e68b79c-9fc7-4feb-944f-4a812533c9f6", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 856, "file_name": "1778051368956-625091960_photo_2026-05-06_10-08-59.jpg", "file_path": "uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/large.webp", "mime_type": "image/webp", "created_at": "2026-05-06T07:09:28.961Z", "uploaded_by": null, "attachment_id": "1e68b79c-9fc7-4feb-944f-4a812533c9f6", "file_path_large": "uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/large.webp", "file_path_thumb": "uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/thumb.webp", "file_path_medium": "uploads/attachments/1e68b79c-9fc7-4feb-944f-4a812533c9f6/medium.webp"}	2026-06-24 02:49:04.163-07
2849fe95-826f-4fdd-8091-0deb98468449	\N	UPDATE	Attachment	aea0f70b-fd0c-451f-8f00-5ea378c653fe	{"width": null, "height": null, "file_name": "1778224902822-565540848_Fire_opal.jpg", "file_path": "uploads/attachments/1778224902822-565540848_Fire_opal.jpg", "mime_type": null, "created_at": "2026-05-08T07:21:42.824Z", "uploaded_by": null, "attachment_id": "aea0f70b-fd0c-451f-8f00-5ea378c653fe", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 800, "height": 726, "file_name": "1778224902822-565540848_Fire_opal.jpg", "file_path": "uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:21:42.824Z", "uploaded_by": null, "attachment_id": "aea0f70b-fd0c-451f-8f00-5ea378c653fe", "file_path_large": "uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/large.webp", "file_path_thumb": "uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/thumb.webp", "file_path_medium": "uploads/attachments/aea0f70b-fd0c-451f-8f00-5ea378c653fe/medium.webp"}	2026-06-24 02:49:04.273-07
93fec8a5-05cb-45eb-adc5-07dd28d6dfcd	\N	UPDATE	Attachment	e5cf84cd-195c-4e05-b99a-701f3388a5d7	{"width": null, "height": null, "file_name": "1778225022375-786134919_wello_opal.jpg", "file_path": "uploads/attachments/1778225022375-786134919_wello_opal.jpg", "mime_type": null, "created_at": "2026-05-08T07:23:42.377Z", "uploaded_by": null, "attachment_id": "e5cf84cd-195c-4e05-b99a-701f3388a5d7", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 259, "height": 194, "file_name": "1778225022375-786134919_wello_opal.jpg", "file_path": "uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:23:42.377Z", "uploaded_by": null, "attachment_id": "e5cf84cd-195c-4e05-b99a-701f3388a5d7", "file_path_large": "uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/large.webp", "file_path_thumb": "uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/thumb.webp", "file_path_medium": "uploads/attachments/e5cf84cd-195c-4e05-b99a-701f3388a5d7/medium.webp"}	2026-06-24 02:49:04.309-07
12304f7c-05ae-4092-8864-15932fd680a8	\N	UPDATE	Attachment	5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0	{"width": null, "height": null, "file_name": "1778225236289-133460761_black_opal.jpg", "file_path": "uploads/attachments/1778225236289-133460761_black_opal.jpg", "mime_type": null, "created_at": "2026-05-08T07:27:16.291Z", "uploaded_by": null, "attachment_id": "5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 640, "height": 500, "file_name": "1778225236289-133460761_black_opal.jpg", "file_path": "uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:27:16.291Z", "uploaded_by": null, "attachment_id": "5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0", "file_path_large": "uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/large.webp", "file_path_thumb": "uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/thumb.webp", "file_path_medium": "uploads/attachments/5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0/medium.webp"}	2026-06-24 02:49:04.406-07
fe7d2baf-1f56-4397-992a-10bee26d0700	\N	UPDATE	Attachment	febdd5e9-b64d-461a-a2ce-bf78cdf993a2	{"width": null, "height": null, "file_name": "1778225481304-625481919_mezezo_opal.jpg", "file_path": "uploads/attachments/1778225481304-625481919_mezezo_opal.jpg", "mime_type": null, "created_at": "2026-05-08T07:31:21.307Z", "uploaded_by": null, "attachment_id": "febdd5e9-b64d-461a-a2ce-bf78cdf993a2", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 570, "height": 421, "file_name": "1778225481304-625481919_mezezo_opal.jpg", "file_path": "uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:31:21.307Z", "uploaded_by": null, "attachment_id": "febdd5e9-b64d-461a-a2ce-bf78cdf993a2", "file_path_large": "uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/large.webp", "file_path_thumb": "uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/thumb.webp", "file_path_medium": "uploads/attachments/febdd5e9-b64d-461a-a2ce-bf78cdf993a2/medium.webp"}	2026-06-24 02:49:04.491-07
9eab4658-8298-490f-a359-2d61e400c84e	\N	UPDATE	Attachment	b5fba326-d867-4c35-b1ac-730015e64178	{"width": null, "height": null, "file_name": "1778225705431-590593055_white_opal.jpg", "file_path": "uploads/attachments/1778225705431-590593055_white_opal.jpg", "mime_type": null, "created_at": "2026-05-08T07:35:05.433Z", "uploaded_by": null, "attachment_id": "b5fba326-d867-4c35-b1ac-730015e64178", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 800, "height": 533, "file_name": "1778225705431-590593055_white_opal.jpg", "file_path": "uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:35:05.433Z", "uploaded_by": null, "attachment_id": "b5fba326-d867-4c35-b1ac-730015e64178", "file_path_large": "uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/large.webp", "file_path_thumb": "uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/thumb.webp", "file_path_medium": "uploads/attachments/b5fba326-d867-4c35-b1ac-730015e64178/medium.webp"}	2026-06-24 02:49:04.567-07
69caf2b6-33f8-415f-8e4b-3e16ff0dfdfa	\N	UPDATE	Attachment	e8db7610-dcb5-4660-8e0d-24992d1db142	{"width": null, "height": null, "file_name": "1778226072038-255009379_opals.jpg", "file_path": "uploads/attachments/1778226072038-255009379_opals.jpg", "mime_type": null, "created_at": "2026-05-08T07:41:12.041Z", "uploaded_by": null, "attachment_id": "e8db7610-dcb5-4660-8e0d-24992d1db142", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 2135, "height": 1786, "file_name": "1778226072038-255009379_opals.jpg", "file_path": "uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:41:12.041Z", "uploaded_by": null, "attachment_id": "e8db7610-dcb5-4660-8e0d-24992d1db142", "file_path_large": "uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/large.webp", "file_path_thumb": "uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/thumb.webp", "file_path_medium": "uploads/attachments/e8db7610-dcb5-4660-8e0d-24992d1db142/medium.webp"}	2026-06-24 02:49:05.09-07
4d9787b1-b9ff-4af4-b90e-b9e034b1b90b	\N	UPDATE	Attachment	e6a50da5-efae-4ee5-9d29-c150c960fe36	{"width": null, "height": null, "file_name": "1778226810045-551491276_ethio-emerald.jpg", "file_path": "uploads/attachments/1778226810045-551491276_ethio-emerald.jpg", "mime_type": null, "created_at": "2026-05-08T07:53:30.048Z", "uploaded_by": null, "attachment_id": "e6a50da5-efae-4ee5-9d29-c150c960fe36", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 636, "height": 358, "file_name": "1778226810045-551491276_ethio-emerald.jpg", "file_path": "uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:53:30.048Z", "uploaded_by": null, "attachment_id": "e6a50da5-efae-4ee5-9d29-c150c960fe36", "file_path_large": "uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/large.webp", "file_path_thumb": "uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/thumb.webp", "file_path_medium": "uploads/attachments/e6a50da5-efae-4ee5-9d29-c150c960fe36/medium.webp"}	2026-06-24 02:49:05.172-07
476938c4-0872-4788-81a9-ad4d6703017d	\N	UPDATE	Attachment	512eae74-f0ee-46d8-9117-d89dee1d2b29	{"width": null, "height": null, "file_name": "1778227051693-548210343_shakiso-emerald.jpg", "file_path": "uploads/attachments/1778227051693-548210343_shakiso-emerald.jpg", "mime_type": null, "created_at": "2026-05-08T07:57:31.695Z", "uploaded_by": null, "attachment_id": "512eae74-f0ee-46d8-9117-d89dee1d2b29", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 275, "height": 183, "file_name": "1778227051693-548210343_shakiso-emerald.jpg", "file_path": "uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T07:57:31.695Z", "uploaded_by": null, "attachment_id": "512eae74-f0ee-46d8-9117-d89dee1d2b29", "file_path_large": "uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/large.webp", "file_path_thumb": "uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/thumb.webp", "file_path_medium": "uploads/attachments/512eae74-f0ee-46d8-9117-d89dee1d2b29/medium.webp"}	2026-06-24 02:49:05.204-07
02fe9086-8b72-46fc-b415-b8ad15229303	\N	UPDATE	Attachment	115491eb-abf0-4ba1-a1e2-5a7ee8debaf2	{"width": null, "height": null, "file_name": "1778227262056-40934564_kenticha-emerald.jpg", "file_path": "uploads/attachments/1778227262056-40934564_kenticha-emerald.jpg", "mime_type": null, "created_at": "2026-05-08T08:01:02.058Z", "uploaded_by": null, "attachment_id": "115491eb-abf0-4ba1-a1e2-5a7ee8debaf2", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 932, "height": 699, "file_name": "1778227262056-40934564_kenticha-emerald.jpg", "file_path": "uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T08:01:02.058Z", "uploaded_by": null, "attachment_id": "115491eb-abf0-4ba1-a1e2-5a7ee8debaf2", "file_path_large": "uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/large.webp", "file_path_thumb": "uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/thumb.webp", "file_path_medium": "uploads/attachments/115491eb-abf0-4ba1-a1e2-5a7ee8debaf2/medium.webp"}	2026-06-24 02:49:05.351-07
9282db19-0ba5-469d-bead-b84e010f927c	\N	UPDATE	Attachment	da39ee50-d9ee-4672-8a46-233854921a94	{"width": null, "height": null, "file_name": "1778227500380-490653513_dermi-eremald.jpg", "file_path": "uploads/attachments/1778227500380-490653513_dermi-eremald.jpg", "mime_type": null, "created_at": "2026-05-08T08:05:00.381Z", "uploaded_by": null, "attachment_id": "da39ee50-d9ee-4672-8a46-233854921a94", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 484, "height": 640, "file_name": "1778227500380-490653513_dermi-eremald.jpg", "file_path": "uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T08:05:00.381Z", "uploaded_by": null, "attachment_id": "da39ee50-d9ee-4672-8a46-233854921a94", "file_path_large": "uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/large.webp", "file_path_thumb": "uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/thumb.webp", "file_path_medium": "uploads/attachments/da39ee50-d9ee-4672-8a46-233854921a94/medium.webp"}	2026-06-24 02:49:05.455-07
2a23c95d-d78e-49b4-92cf-b41e73742f79	\N	UPDATE	Attachment	a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8	{"width": null, "height": null, "file_name": "1778227913363-64992621_Beryl-Emerald.jpg", "file_path": "uploads/attachments/1778227913363-64992621_Beryl-Emerald.jpg", "mime_type": null, "created_at": "2026-05-08T08:11:53.366Z", "uploaded_by": null, "attachment_id": "a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 3140, "height": 2840, "file_name": "1778227913363-64992621_Beryl-Emerald.jpg", "file_path": "uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T08:11:53.366Z", "uploaded_by": null, "attachment_id": "a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8", "file_path_large": "uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/large.webp", "file_path_thumb": "uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/thumb.webp", "file_path_medium": "uploads/attachments/a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8/medium.webp"}	2026-06-24 02:49:06.166-07
b5d64424-ec24-4fec-b0ad-78b702ac6c39	\N	UPDATE	Attachment	acc6bcca-d249-4e78-ad9b-8942da143eb2	{"width": null, "height": null, "file_name": "1778228221421-483656894_ethio-emerald.jpg", "file_path": "uploads/attachments/1778228221421-483656894_ethio-emerald.jpg", "mime_type": null, "created_at": "2026-05-08T08:17:01.422Z", "uploaded_by": null, "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 636, "height": 358, "file_name": "1778228221421-483656894_ethio-emerald.jpg", "file_path": "uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T08:17:01.422Z", "uploaded_by": null, "attachment_id": "acc6bcca-d249-4e78-ad9b-8942da143eb2", "file_path_large": "uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/large.webp", "file_path_thumb": "uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/thumb.webp", "file_path_medium": "uploads/attachments/acc6bcca-d249-4e78-ad9b-8942da143eb2/medium.webp"}	2026-06-24 02:49:06.245-07
5f81c26f-a4c5-4ec5-8e68-88ee2e81a890	\N	UPDATE	Attachment	515894af-3621-4ba3-8f27-a917c1e13060	{"width": null, "height": null, "file_name": "1778228322436-766691958_Ethiopian-emerald.jpg", "file_path": "uploads/attachments/1778228322436-766691958_Ethiopian-emerald.jpg", "mime_type": null, "created_at": "2026-05-08T08:18:42.438Z", "uploaded_by": null, "attachment_id": "515894af-3621-4ba3-8f27-a917c1e13060", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 636, "height": 358, "file_name": "1778228322436-766691958_Ethiopian-emerald.jpg", "file_path": "uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/large.webp", "mime_type": "image/webp", "created_at": "2026-05-08T08:18:42.438Z", "uploaded_by": null, "attachment_id": "515894af-3621-4ba3-8f27-a917c1e13060", "file_path_large": "uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/large.webp", "file_path_thumb": "uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/thumb.webp", "file_path_medium": "uploads/attachments/515894af-3621-4ba3-8f27-a917c1e13060/medium.webp"}	2026-06-24 02:49:06.326-07
234d13ae-5318-4acf-af81-e6bd385b31b3	\N	UPDATE	Attachment	881632e9-09ac-4ace-aa2a-1aeeafcdd8aa	{"width": null, "height": null, "file_name": "1780898358751-914976241_cornea.png", "file_path": "uploads/attachments/1780898358751-914976241_cornea.png", "mime_type": null, "created_at": "2026-06-08T05:59:18.758Z", "uploaded_by": null, "attachment_id": "881632e9-09ac-4ace-aa2a-1aeeafcdd8aa", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 1280, "file_name": "1780898358751-914976241_cornea.png", "file_path": "uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/large.webp", "mime_type": "image/webp", "created_at": "2026-06-08T05:59:18.758Z", "uploaded_by": null, "attachment_id": "881632e9-09ac-4ace-aa2a-1aeeafcdd8aa", "file_path_large": "uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/large.webp", "file_path_thumb": "uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/thumb.webp", "file_path_medium": "uploads/attachments/881632e9-09ac-4ace-aa2a-1aeeafcdd8aa/medium.webp"}	2026-06-24 02:49:06.941-07
2ec98c7e-c068-4f9e-bb7a-03851b1e84c0	\N	UPDATE	Attachment	36758606-5185-4283-b7b9-aa30a61466eb	{"width": null, "height": null, "file_name": "1780898358760-153294951_eye.jpg", "file_path": "uploads/attachments/1780898358760-153294951_eye.jpg", "mime_type": null, "created_at": "2026-06-08T05:59:18.761Z", "uploaded_by": null, "attachment_id": "36758606-5185-4283-b7b9-aa30a61466eb", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 800, "height": 429, "file_name": "1780898358760-153294951_eye.jpg", "file_path": "uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/large.webp", "mime_type": "image/webp", "created_at": "2026-06-08T05:59:18.761Z", "uploaded_by": null, "attachment_id": "36758606-5185-4283-b7b9-aa30a61466eb", "file_path_large": "uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/large.webp", "file_path_thumb": "uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/thumb.webp", "file_path_medium": "uploads/attachments/36758606-5185-4283-b7b9-aa30a61466eb/medium.webp"}	2026-06-24 02:49:06.998-07
f2ccc539-efce-4f39-a3ee-7617e827bb95	\N	UPDATE	Attachment	d5475308-796a-4719-8405-319d287e61a8	{"width": null, "height": null, "file_name": "1780898358772-871628174_lumbar_support.jpg", "file_path": "uploads/attachments/1780898358772-871628174_lumbar_support.jpg", "mime_type": null, "created_at": "2026-06-08T05:59:18.773Z", "uploaded_by": null, "attachment_id": "d5475308-796a-4719-8405-319d287e61a8", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 225, "height": 225, "file_name": "1780898358772-871628174_lumbar_support.jpg", "file_path": "uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/large.webp", "mime_type": "image/webp", "created_at": "2026-06-08T05:59:18.773Z", "uploaded_by": null, "attachment_id": "d5475308-796a-4719-8405-319d287e61a8", "file_path_large": "uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/large.webp", "file_path_thumb": "uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/thumb.webp", "file_path_medium": "uploads/attachments/d5475308-796a-4719-8405-319d287e61a8/medium.webp"}	2026-06-24 02:49:07.035-07
3805772e-1c06-4ff2-8384-0b06147b4a4f	\N	UPDATE	Attachment	172b9bb7-3ff2-4f76-892d-fa587a989c0a	{"width": null, "height": null, "file_name": "1780899630827-853890181_photo_2026-05-06_09-39-45.jpg", "file_path": "uploads/attachments/1780899630827-853890181_photo_2026-05-06_09-39-45.jpg", "mime_type": null, "created_at": "2026-06-08T06:20:30.831Z", "uploaded_by": null, "attachment_id": "172b9bb7-3ff2-4f76-892d-fa587a989c0a", "file_path_large": null, "file_path_thumb": null, "file_path_medium": null}	{"width": 1280, "height": 960, "file_name": "1780899630827-853890181_photo_2026-05-06_09-39-45.jpg", "file_path": "uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/large.webp", "mime_type": "image/webp", "created_at": "2026-06-08T06:20:30.831Z", "uploaded_by": null, "attachment_id": "172b9bb7-3ff2-4f76-892d-fa587a989c0a", "file_path_large": "uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/large.webp", "file_path_thumb": "uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/thumb.webp", "file_path_medium": "uploads/attachments/172b9bb7-3ff2-4f76-892d-fa587a989c0a/medium.webp"}	2026-06-24 02:49:07.295-07
\.


--
-- Data for Name: background_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.background_attachments (background_attachment_id, background_id, attachment_id, created_at) FROM stdin;
74f2cce7-ac7e-4113-ae19-2d2d5176c685	387e059c-efaa-49f8-b112-c939acae1e3c	e2d9e203-d471-4b1b-91f8-7dab6f1ffb4d	2026-04-28 23:15:53.735-07
715c9b07-d0d7-4458-a80b-2148afb66b00	387e059c-efaa-49f8-b112-c939acae1e3c	b9e92df0-a3d1-4f86-b6fa-c439e6160b38	2026-04-28 23:15:53.735-07
\.


--
-- Data for Name: backgrounds; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.backgrounds (background_id, title, description, icon, content, created_at, updated_at) FROM stdin;
387e059c-efaa-49f8-b112-c939acae1e3c	Ministry Background	Established to regulate and develop Ethiopia's mineral and petroleum resources for sustainable economic growth and national development.	Globe2	The Ministry of Mines of Ethiopia is responsible for managing and developing the nation’s mineral resources. It promotes sustainable mining, ensures transparent regulation, and supports investment to drive economic growth and national development.	2026-04-28 23:06:12.768305-07	2026-04-28 23:06:12.768305-07
\.


--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.cards (card_id, title, description, button_name, button_url, attachment_id, created_at, updated_at, deleted_at) FROM stdin;
e8deda30-ab07-4d72-8b78-7e48d567fe88	Why Invest in Ethiopia?	Discover Ethiopia’s vast mineral potential, strategic location, and growing investment opportunities in the mining sector.	Start Exploring	https://www.mom.gov.et/en/investigating-in-ethiopia	519dbdc4-1e62-4820-b5ad-06acb7cf979d	2026-04-28 22:51:43.914-07	2026-04-28 22:51:46.516-07	\N
\.


--
-- Data for Name: core_values; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.core_values (value_id, section_id, title, icon, content) FROM stdin;
2020cb34-22e6-4ff2-a7b0-80676406e792	edc22acf-b804-4212-a12a-6cfea539a850	Diligence :Commitment to hard work, efficiency, and the timely execution of mandates. It reflects a culture of productivity and persistence in achieving sector goals.	\N	Diligence :Commitment to hard work, efficiency, and the timely execution of mandates. It reflects a culture of productivity and persistence in achieving sector goals.
044bef9d-da00-4558-a178-fdb117be1484	edc22acf-b804-4212-a12a-6cfea539a850	Collaboration:\nFostering partnerships between the government, private investors, and local communities. It emphasizes teamwork and integrated development.\n	\N	Collaboration:\nFostering partnerships between the government, private investors, and local communities. It emphasizes teamwork and integrated development.\n
6a2c7667-3411-4b94-b95d-ee9fb82c284a	edc22acf-b804-4212-a12a-6cfea539a850	Integrity:\nMaintaining the highest ethical standards. In the mining industry, this specifically refers to "Clean Mining"—operating without corruption, ensuring transparency in licensing, and upholding environmental purity.\n	\N	Integrity:\nMaintaining the highest ethical standards. In the mining industry, this specifically refers to "Clean Mining"—operating without corruption, ensuring transparency in licensing, and upholding environmental purity.\n
e4b76a57-ebb0-4287-bb47-983dc5d2aa3a	edc22acf-b804-4212-a12a-6cfea539a850	Service-Mindedness:\nA commitment to serving the public interest. This value ensures that the ministry acts as a facilitator for citizens and investors rather than just a bureaucratic hurdle.\n	\N	Service-Mindedness:\nA commitment to serving the public interest. This value ensures that the ministry acts as a facilitator for citizens and investors rather than just a bureaucratic hurdle.\n
\.


--
-- Data for Name: event_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event_attachments (event_attachment_id, event_id, attachment_id, created_at) FROM stdin;
4262460e-d1ca-486c-92a1-fc6134bfc6e0	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	5ea5261e-d990-4838-9a28-58f1aa79b6cf	2026-05-06 00:17:44.478-07
2e317186-d9b3-4b30-bc45-e252d1ce5763	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	0f05c40d-ecef-45b6-8822-3d2f0dffe345	2026-05-06 00:17:44.478-07
4d0cc086-7bbf-41a9-ad22-0e62cd591f99	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	7b4c84a9-88a8-4067-b83e-c8e967189bf4	2026-05-06 00:17:44.478-07
312f29de-7a00-47af-911a-320f7753f9d8	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	ddeba2d0-a17e-4251-8d08-55c1f8945841	2026-05-06 00:17:44.478-07
2c158bc9-30af-4eb3-a917-0b56deecbb19	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	e37ae1be-549b-40b3-bed0-6bb05cce942f	2026-05-06 00:17:44.478-07
28ad9113-4004-4cf1-8282-fe89c201f03c	9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	1e68b79c-9fc7-4feb-944f-4a812533c9f6	2026-05-06 00:17:44.478-07
\.


--
-- Data for Name: event_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.event_categories (event_category_id, name, created_at) FROM stdin;
0a2a2ebc-5502-446f-8f00-fc63f26e5e0a	InternationalWomensDay	2026-05-06 00:06:21.484-07
7ce18cf7-e2f8-4a44-ac9a-cebae1cb0a50	GenderEquality	2026-05-06 00:06:29.963-07
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.events (event_id, title, event_category_id, description, start_time, end_time, location, virtual_link, organizer, content, status, publish_start, publish_end, published_at, approved_by, approved_at, created_by, created_at, updated_at, deleted_at) FROM stdin;
9bfe3915-2481-42c6-81c6-72ae8d3e7bf6	Celebration of International Women’s Day in the Mining Sector	0a2a2ebc-5502-446f-8f00-fc63f26e5e0a	The Ministry of Mines celebrated International Women’s Day, emphasizing women’s empowerment, participation, and equality in the mining sector.	2026-03-12 21:09:00-07	2026-03-13 21:09:00-07	Minstry of Mines	https://www.mom.gov.et/en	Minstry of Mines	<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;along&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;celebrated&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;through&nbsp;various&nbsp;events&nbsp;and&nbsp;discussions.&nbsp;The&nbsp;celebration&nbsp;highlighted&nbsp;ongoing&nbsp;efforts&nbsp;to&nbsp;enhance&nbsp;women’s&nbsp;participation,&nbsp;contribution,&nbsp;and&nbsp;benefits&nbsp;within&nbsp;the&nbsp;mining&nbsp;sector.</p><p>Observed&nbsp;under&nbsp;the&nbsp;theme&nbsp;<strong>“Women’s&nbsp;Voice&nbsp;for&nbsp;Equality&nbsp;and&nbsp;a&nbsp;Prosperous&nbsp;Ethiopia,”</strong>&nbsp;the&nbsp;event&nbsp;marked&nbsp;the&nbsp;50th&nbsp;celebration&nbsp;in&nbsp;Ethiopia&nbsp;and&nbsp;the&nbsp;115th&nbsp;globally.&nbsp;Discussions&nbsp;emphasized&nbsp;the&nbsp;importance&nbsp;of&nbsp;strengthening&nbsp;gender&nbsp;equality,&nbsp;empowering&nbsp;women,&nbsp;and&nbsp;ensuring&nbsp;inclusive&nbsp;growth&nbsp;within&nbsp;the&nbsp;sector.</p><p>The&nbsp;event&nbsp;also&nbsp;acknowledged&nbsp;the&nbsp;broader&nbsp;significance&nbsp;of&nbsp;International&nbsp;Women’s&nbsp;Day&nbsp;in&nbsp;promoting&nbsp;women’s&nbsp;social,&nbsp;economic,&nbsp;political,&nbsp;and&nbsp;cultural&nbsp;contributions,&nbsp;while&nbsp;advancing&nbsp;gender&nbsp;equality&nbsp;and&nbsp;women’s&nbsp;rights.</p>	published	2026-05-05 21:10:00-07	2027-02-05 21:15:00-08	2026-05-06 00:17:44.471-07	\N	\N	\N	2026-05-06 00:11:30.346-07	2026-05-06 00:17:44.47-07	\N
\.


--
-- Data for Name: federal_office_contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.federal_office_contacts (federal_office_id, office_address, phone, email, map_location, created_at, updated_at, deleted_at) FROM stdin;
7dbfde0c-0da0-46bd-b6ad-cc03481e2581	Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት	01166754806 | 0116675524 | 0116675622	info@mom.gov.et	Ministry Of Mines | Lamberet | የማዕድን ሚንስተር | ላምበረት	2026-04-29 04:17:27.061-07	2026-04-29 04:19:21.585-07	\N
\.


--
-- Data for Name: footer_sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.footer_sections (footer_section_id, footer_id, section_name, links, created_at, updated_at) FROM stdin;
e298e988-324a-4052-862c-1f8c8e8519dc	4099dfcc-841b-4666-9b62-5b2e076d06db	Quick Links	[{"label":"Mining Sector","url":"https://www.mom.gov.et/en/mining"},{"label":"Services","url":"https://www.mom.gov.et/en/services"},{"label":"News & Updates","url":"https://www.mom.gov.et/en/news"}]	2026-05-04 01:51:30.246-07	2026-05-04 02:09:13.906-07
1bbdbf1f-84a7-4697-b7fa-98affbfe4f8a	4099dfcc-841b-4666-9b62-5b2e076d06db	Resources	[{"label":"Licensing & Legislation","url":"https://www.mom.gov.et/en/mining/licensing-and-legislation"},{"label":"Mining Data","url":"https://www.mom.gov.et/en/mining/data"},{"label":"Gemstones","url":"https://www.mom.gov.et/en/mining/gemstones"},{"label":"Application Portal","url":"https://www.mom.gov.et/en/mining/application-portal"}]	2026-05-04 01:51:30.25-07	2026-05-04 02:09:13.907-07
70038460-f362-4694-94e0-fe27c6cd3f0b	4099dfcc-841b-4666-9b62-5b2e076d06db	Contact	[{"label":"Federal Office","url":"https://www.mom.gov.et/en/contact"},{"label":"Regional Offices","url":"https://www.mom.gov.et/en/contact/regional-offices"}]	2026-05-04 01:51:30.252-07	2026-05-04 02:09:13.908-07
\.


--
-- Data for Name: footers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.footers (footer_id, title, text, attachment_id, content, created_at, updated_at) FROM stdin;
4099dfcc-841b-4666-9b62-5b2e076d06db	Ministry of Mines	© 2026 Ministry of Mines – Ethiopia. All rights reserved.	5dac84b0-a2cd-4ffa-b4b8-3ec5a23503c3	\N	2026-05-04 01:51:30.239-07	2026-05-04 02:09:13.903-07
\.


--
-- Data for Name: gamestone_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gamestone_attachments (gamestone_attachment_id, gamestone_id, attachment_id, created_at) FROM stdin;
\.


--
-- Data for Name: gamestones; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.gamestones (gamestone_id, title, description, location, attachment_id, discovered_date, parent_id, created_at, updated_at, deleted_at) FROM stdin;
9ae73d62-12c7-4ec2-b2ae-0fd054c4c180	Welo Opal	<p>Welo&nbsp;Opals,&nbsp;discovered&nbsp;in&nbsp;northern&nbsp;Ethiopia’s&nbsp;Wollo&nbsp;Province,&nbsp;are&nbsp;among&nbsp;the&nbsp;most&nbsp;famous&nbsp;Ethiopian&nbsp;gemstones.&nbsp;These&nbsp;opals&nbsp;are&nbsp;prized&nbsp;for&nbsp;their&nbsp;intense&nbsp;brightness,&nbsp;vivid&nbsp;rainbow-like&nbsp;color&nbsp;flashes,&nbsp;and&nbsp;superior&nbsp;durability&nbsp;compared&nbsp;to&nbsp;earlier&nbsp;Ethiopian&nbsp;opals.&nbsp;Welo&nbsp;opals&nbsp;commonly&nbsp;occur&nbsp;as&nbsp;white,&nbsp;crystal,&nbsp;or&nbsp;fire&nbsp;opals&nbsp;and&nbsp;are&nbsp;highly&nbsp;sought&nbsp;after&nbsp;in&nbsp;international&nbsp;jewelry&nbsp;markets.</p><p><strong>Known&nbsp;For:</strong>&nbsp;Brilliant&nbsp;color&nbsp;play,&nbsp;transparency,&nbsp;durability.</p><p>&nbsp;<strong>Applications:</strong>&nbsp;Rings,&nbsp;necklaces,&nbsp;pendants,&nbsp;luxury&nbsp;jewelry.</p>	Northern Ethiopia, Wollo Province	e5cf84cd-195c-4e05-b99a-701f3388a5d7	1980-07-07 17:00:00-07	17ead0c5-b626-42a4-8402-a10589425829	2026-05-08 00:16:00.241-07	2026-05-08 00:23:48.38-07	\N
db5d6901-5cb3-40be-a42b-834e52c8be44	Black Opal	<p>Among&nbsp;the&nbsp;rarest&nbsp;Ethiopian&nbsp;opals,&nbsp;Black&nbsp;Opals&nbsp;feature&nbsp;dark&nbsp;gray&nbsp;to&nbsp;black&nbsp;body&nbsp;tones&nbsp;that&nbsp;dramatically&nbsp;enhance&nbsp;the&nbsp;gemstone’s&nbsp;colorful&nbsp;flashes.&nbsp;These&nbsp;stones&nbsp;are&nbsp;highly&nbsp;valuable&nbsp;due&nbsp;to&nbsp;their&nbsp;rarity&nbsp;and&nbsp;striking&nbsp;contrast.</p><p><strong>Properties:</strong>&nbsp;Dark&nbsp;body&nbsp;tone,&nbsp;vivid&nbsp;spectral&nbsp;flashes,&nbsp;rarity.</p><p><strong>Applications:</strong>&nbsp;High-end&nbsp;jewelry,&nbsp;gemstone&nbsp;investment,&nbsp;premium&nbsp;collections.</p>	 Northern highlands of Ethiopia	5e6bdaac-7a22-41ef-84dc-b4f35b2c21d0	2013-07-10 17:00:00-07	17ead0c5-b626-42a4-8402-a10589425829	2026-05-08 00:27:21.432-07	2026-05-08 00:27:21.432-07	\N
0ec3ca68-31ab-4851-8954-4179bc28da3b	Mezezo Opal	<p>Mezezo&nbsp;Opals&nbsp;were&nbsp;the&nbsp;first&nbsp;Ethiopian&nbsp;opals&nbsp;discovered&nbsp;commercially&nbsp;in&nbsp;1994.&nbsp;Known&nbsp;for&nbsp;their&nbsp;reddish-brown,&nbsp;orange,&nbsp;and&nbsp;chocolate-colored&nbsp;body&nbsp;tones,&nbsp;these&nbsp;opals&nbsp;possess&nbsp;a&nbsp;unique&nbsp;earthy&nbsp;beauty&nbsp;and&nbsp;historical&nbsp;significance&nbsp;within&nbsp;Ethiopia’s&nbsp;gemstone&nbsp;industry.</p><p><strong>Properties:</strong>&nbsp;Chocolate-brown&nbsp;tones,&nbsp;volcanic&nbsp;origin,&nbsp;natural&nbsp;uniqueness.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;collectors’&nbsp;stones,&nbsp;cultural&nbsp;gemstone&nbsp;trade.</p>	 North Shewa	febdd5e9-b64d-461a-a2ce-bf78cdf993a2	1994-06-07 17:00:00-07	17ead0c5-b626-42a4-8402-a10589425829	2026-05-08 00:31:25.953-07	2026-05-08 00:31:25.953-07	\N
3a695bc7-5061-4337-ad9b-68c07c24bd9f	White Precious Opal	<p>White&nbsp;Precious&nbsp;Opals&nbsp;are&nbsp;bright&nbsp;Ethiopian&nbsp;opals&nbsp;with&nbsp;white&nbsp;or&nbsp;milky&nbsp;body&nbsp;colors&nbsp;and&nbsp;exceptional&nbsp;rainbow&nbsp;flashes.&nbsp;They&nbsp;are&nbsp;considered&nbsp;among&nbsp;the&nbsp;most&nbsp;stable&nbsp;and&nbsp;visually&nbsp;vibrant&nbsp;Ethiopian&nbsp;opals.</p><p><strong>Properties:</strong>&nbsp;Bright&nbsp;white&nbsp;body&nbsp;tone,&nbsp;high&nbsp;brilliance,&nbsp;strong&nbsp;color&nbsp;play.</p><p><strong>Applications:</strong>&nbsp;Fine&nbsp;jewelry,&nbsp;gemstone&nbsp;exhibitions,&nbsp;luxury&nbsp;accessories.</p>	Amhara Regional State, (Wegel Tena)	b5fba326-d867-4c35-b1ac-730015e64178	2008-06-07 17:00:00-07	17ead0c5-b626-42a4-8402-a10589425829	2026-05-08 00:35:10.581-07	2026-05-08 00:35:10.581-07	\N
38f2d23a-f291-4e3d-b837-43917118487d	Opal	<p><span style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">Properties:</strong><span style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">Applications:</strong><span style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">&nbsp;Gemstone.</span></p>	Mezezo, Shewa Province	\N	1998-06-07 17:00:00-07	\N	2026-05-08 00:05:34.627-07	2026-05-08 00:05:34.627-07	2026-05-08 00:06:10.578-07
dc7983ad-d122-437a-b95d-f9053113eacf	Fire Opal	<p>Ethiopian&nbsp;Fire&nbsp;Opals&nbsp;are&nbsp;translucent&nbsp;gemstones&nbsp;with&nbsp;warm&nbsp;body&nbsp;colors&nbsp;ranging&nbsp;from&nbsp;yellow&nbsp;and&nbsp;orange&nbsp;to&nbsp;deep&nbsp;red.&nbsp;Combined&nbsp;with&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;green,&nbsp;purple,&nbsp;and&nbsp;blue,&nbsp;these&nbsp;opals&nbsp;symbolize&nbsp;passion,&nbsp;energy,&nbsp;and&nbsp;emotional&nbsp;strength.</p><p><strong>Properties:</strong>&nbsp;Warm&nbsp;fiery&nbsp;tones,&nbsp;luminous&nbsp;transparency,&nbsp;energetic&nbsp;symbolism.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;collector&nbsp;gemstones,&nbsp;spiritual&nbsp;accessories.</p>	 Wollo and Shewa regions	aea0f70b-fd0c-451f-8f00-5ea378c653fe	1980-02-07 16:00:00-08	17ead0c5-b626-42a4-8402-a10589425829	2026-05-08 00:22:20.927-07	2026-05-08 00:22:20.927-07	\N
17ead0c5-b626-42a4-8402-a10589425829	Ethiopian Opal	<p class="ql-align-justify"><strong>Ethiopian&nbsp;Opal</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;world’s&nbsp;most&nbsp;fascinating&nbsp;and&nbsp;visually&nbsp;captivating&nbsp;gemstones,&nbsp;celebrated&nbsp;for&nbsp;its&nbsp;extraordinary&nbsp;play-of&nbsp;color,&nbsp;volcanic&nbsp;origin,&nbsp;and&nbsp;rich&nbsp;cultural&nbsp;significance.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;(Welo)&nbsp;and&nbsp;Mezezo&nbsp;regions&nbsp;of&nbsp;Ethiopia,&nbsp;these&nbsp;opals&nbsp;display&nbsp;vibrant&nbsp;flashes&nbsp;of&nbsp;red,&nbsp;green,&nbsp;blue,&nbsp;orange,&nbsp;violet,&nbsp;and&nbsp;gold&nbsp;that&nbsp;shift&nbsp;beautifully&nbsp;under&nbsp;changing&nbsp;light.&nbsp;Their&nbsp;unique&nbsp;beauty&nbsp;and&nbsp;rarity&nbsp;have&nbsp;positioned&nbsp;Ethiopia&nbsp;as&nbsp;one&nbsp;of&nbsp;the&nbsp;leading&nbsp;opal-producing&nbsp;countries&nbsp;globally,&nbsp;second&nbsp;only&nbsp;to&nbsp;Australia&nbsp;in&nbsp;modern&nbsp;opal&nbsp;production.</p><p class="ql-align-justify">Unlike&nbsp;many&nbsp;traditional&nbsp;opals&nbsp;formed&nbsp;deep&nbsp;underground,&nbsp;Ethiopian&nbsp;opals&nbsp;develop&nbsp;within&nbsp;volcanic&nbsp;rock&nbsp;in&nbsp;high&nbsp;mountainous&nbsp;regions&nbsp;through&nbsp;silica-rich&nbsp;water&nbsp;deposits&nbsp;created&nbsp;by&nbsp;ancient&nbsp;volcanic&nbsp;activity.&nbsp;This&nbsp;geological&nbsp;process&nbsp;gives&nbsp;Ethiopian&nbsp;opals&nbsp;their&nbsp;distinctive&nbsp;hydrophane&nbsp;nature,&nbsp;meaning&nbsp;the&nbsp;stone&nbsp;can&nbsp;absorb&nbsp;water&nbsp;and&nbsp;temporarily&nbsp;change&nbsp;in&nbsp;appearance,&nbsp;becoming&nbsp;more&nbsp;transparent&nbsp;and&nbsp;vivid&nbsp;when&nbsp;wet.</p><p class="ql-align-justify">The&nbsp;discovery&nbsp;of&nbsp;Ethiopian&nbsp;opals&nbsp;transformed&nbsp;the&nbsp;global&nbsp;gemstone&nbsp;market.&nbsp;The&nbsp;first&nbsp;major&nbsp;deposit&nbsp;was&nbsp;discovered&nbsp;in&nbsp;1994&nbsp;in&nbsp;the&nbsp;Shewa&nbsp;Province&nbsp;near&nbsp;Mezezo,&nbsp;producing&nbsp;reddish-brown&nbsp;and&nbsp;chocolate-colored&nbsp;opals.&nbsp;Later&nbsp;discoveries&nbsp;in&nbsp;the&nbsp;Wollo&nbsp;Province&nbsp;near&nbsp;Wegel&nbsp;Tena&nbsp;introduced&nbsp;highly&nbsp;durable&nbsp;white,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;black&nbsp;opals&nbsp;with&nbsp;intense&nbsp;color&nbsp;play&nbsp;that&nbsp;quickly&nbsp;gained&nbsp;international&nbsp;demand&nbsp;among&nbsp;collectors,&nbsp;jewelers,&nbsp;and&nbsp;gemstone&nbsp;enthusiasts.</p><p class="ql-align-justify">Ethiopian&nbsp;opals&nbsp;are&nbsp;admired&nbsp;not&nbsp;only&nbsp;for&nbsp;their&nbsp;physical&nbsp;beauty&nbsp;but&nbsp;also&nbsp;for&nbsp;their&nbsp;symbolic&nbsp;and&nbsp;spiritual&nbsp;significance.&nbsp;Across&nbsp;many&nbsp;cultures,&nbsp;opals&nbsp;represent&nbsp;hope,&nbsp;creativity,&nbsp;emotional&nbsp;healing,&nbsp;purity,&nbsp;and&nbsp;transformation.&nbsp;Fire&nbsp;opals&nbsp;symbolize&nbsp;passion&nbsp;and&nbsp;energy,&nbsp;while&nbsp;black&nbsp;opals&nbsp;are&nbsp;associated&nbsp;with&nbsp;protection&nbsp;and&nbsp;mystery.&nbsp;Historically,&nbsp;opals&nbsp;were&nbsp;believed&nbsp;to&nbsp;carry&nbsp;lightning&nbsp;from&nbsp;the&nbsp;heavens,&nbsp;offering&nbsp;wisdom,&nbsp;inspiration,&nbsp;and&nbsp;positive&nbsp;energy&nbsp;to&nbsp;their&nbsp;wearer.</p><p class="ql-align-justify">Today,&nbsp;Ethiopian&nbsp;opals&nbsp;are&nbsp;widely&nbsp;used&nbsp;in&nbsp;luxury&nbsp;jewelry,&nbsp;gemstone&nbsp;collections,&nbsp;decorative&nbsp;art,&nbsp;and&nbsp;spiritual&nbsp;practices.&nbsp;Their&nbsp;unique&nbsp;patterns&nbsp;—&nbsp;including&nbsp;honeycomb,&nbsp;broad&nbsp;flash,&nbsp;and&nbsp;fire&nbsp;cloud&nbsp;effects&nbsp;—&nbsp;make&nbsp;every&nbsp;gemstone&nbsp;completely&nbsp;one&nbsp;of&nbsp;a&nbsp;kind.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Brilliant&nbsp;multicolor&nbsp;play-of-color&nbsp;effect</li><li>Formed&nbsp;through&nbsp;volcanic&nbsp;geological&nbsp;activity</li><li>Hydrophane&nbsp;structure&nbsp;capable&nbsp;of&nbsp;absorbing&nbsp;water</li><li>Unique&nbsp;honeycomb&nbsp;and&nbsp;fire-flash&nbsp;patterns</li><li>Available&nbsp;in&nbsp;white,&nbsp;black,&nbsp;crystal,&nbsp;fire,&nbsp;and&nbsp;chocolate&nbsp;opal&nbsp;varieties</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Creativity&nbsp;and&nbsp;inspiration</li><li>Hope&nbsp;and&nbsp;emotional&nbsp;healing</li><li>Passion,&nbsp;transformation,&nbsp;and&nbsp;positivity</li><li>Spiritual&nbsp;awareness&nbsp;and&nbsp;balance</li><li>Protection&nbsp;and&nbsp;inner&nbsp;clarity</li></ul><h3><strong>Applications</strong></h3><ul><li>Fine&nbsp;jewelry&nbsp;and&nbsp;luxury&nbsp;accessories</li><li>Gemstone&nbsp;investment&nbsp;and&nbsp;collections</li><li>Decorative&nbsp;and&nbsp;artistic&nbsp;uses</li><li>Spiritual&nbsp;and&nbsp;meditation&nbsp;practices</li><li>International&nbsp;gemstone&nbsp;trade</li></ul>	Mezezo & Wollo Regions, Ethiopia	e8db7610-dcb5-4660-8e0d-24992d1db142	1998-06-07 17:00:00-07	\N	2026-05-08 00:05:07.578-07	2026-05-08 00:47:47.453-07	\N
bf2d54c4-d21e-4a41-8b6b-6499522fba8f	Opal	<p><span style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">Silica&nbsp;mineral&nbsp;extensively&nbsp;used&nbsp;as&nbsp;a&nbsp;gemstone.&nbsp;Includes&nbsp;black&nbsp;opal,&nbsp;white&nbsp;opal,&nbsp;and&nbsp;fire&nbsp;opal.</span></p><p><strong style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">Properties:</strong><span style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">&nbsp;High&nbsp;vibrational&nbsp;energy,&nbsp;amplification&nbsp;powers,&nbsp;balance.&nbsp;</span><strong style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">Applications:</strong><span style="background-color: rgb(31, 31, 31); color: rgb(204, 204, 204);">&nbsp;Gemstone.</span></p>	Mezezo, Shewa Province	\N	1998-06-07 17:00:00-07	\N	2026-05-08 00:05:01.419-07	2026-05-08 00:05:01.419-07	2026-05-08 00:06:12.77-07
ac8357d7-48b8-4668-ae8a-ac984fd5238d	Shakiso Emerald	<p>Shakiso&nbsp;Emeralds&nbsp;are&nbsp;the&nbsp;most&nbsp;recognized&nbsp;Ethiopian&nbsp;emeralds,&nbsp;discovered&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;of&nbsp;Oromia.&nbsp;These&nbsp;gemstones&nbsp;are&nbsp;admired&nbsp;for&nbsp;their&nbsp;vivid&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;coloration,&nbsp;strong&nbsp;saturation,&nbsp;and&nbsp;exceptional&nbsp;brilliance.&nbsp;Many&nbsp;Shakiso&nbsp;emeralds&nbsp;possess&nbsp;a&nbsp;glowing&nbsp;appearance&nbsp;that&nbsp;makes&nbsp;them&nbsp;highly&nbsp;desirable&nbsp;in&nbsp;luxury&nbsp;jewelry&nbsp;markets.&nbsp;The&nbsp;region&nbsp;produces&nbsp;both&nbsp;commercial-grade&nbsp;and&nbsp;fine&nbsp;gem-quality&nbsp;emeralds,&nbsp;with&nbsp;some&nbsp;stones&nbsp;requiring&nbsp;little&nbsp;to&nbsp;no&nbsp;enhancement.</p><p><strong>Known&nbsp;For:</strong>&nbsp;Electric-green&nbsp;color,&nbsp;strong&nbsp;saturation,&nbsp;gem-quality&nbsp;clarity.</p><p><strong>Applications:</strong>&nbsp;Rings,&nbsp;pendants,&nbsp;necklaces,&nbsp;luxury&nbsp;gemstone&nbsp;jewelry.</p>	Shakiso, Ethiopia	512eae74-f0ee-46d8-9117-d89dee1d2b29	2016-11-22 16:00:00-08	4aaeffb6-de37-4bb3-aec3-713784ff44e5	2026-05-08 00:58:16.277-07	2026-05-08 00:58:16.277-07	\N
8b0bcfe4-036c-4f2e-81ca-b4a2480f24eb	Kenticha Emerald	<p>Kenticha&nbsp;Emeralds&nbsp;originate&nbsp;from&nbsp;the&nbsp;Kenticha&nbsp;mining&nbsp;area&nbsp;in&nbsp;southern&nbsp;Ethiopia&nbsp;and&nbsp;are&nbsp;known&nbsp;for&nbsp;their&nbsp;naturally&nbsp;rich&nbsp;green&nbsp;appearance&nbsp;and&nbsp;large&nbsp;crystal&nbsp;formations.&nbsp;These&nbsp;emeralds&nbsp;often&nbsp;contain&nbsp;natural&nbsp;mineral&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite,&nbsp;giving&nbsp;each&nbsp;stone&nbsp;a&nbsp;distinctive&nbsp;internal&nbsp;character.&nbsp;Kenticha&nbsp;emeralds&nbsp;have&nbsp;become&nbsp;increasingly&nbsp;important&nbsp;in&nbsp;Ethiopia’s&nbsp;growing&nbsp;gemstone&nbsp;export&nbsp;industry.</p><p><strong>Properties:</strong>&nbsp;Natural&nbsp;inclusions,&nbsp;deep&nbsp;green&nbsp;tones,&nbsp;large&nbsp;rough&nbsp;crystals.</p><p><strong>Applications:</strong>&nbsp;Fine&nbsp;jewelry,&nbsp;gemstone&nbsp;cutting,&nbsp;collectors’&nbsp;stones.</p>	Southern Ethiopia, Kenticha 	115491eb-abf0-4ba1-a1e2-5a7ee8debaf2	2016-06-29 17:00:00-07	4aaeffb6-de37-4bb3-aec3-713784ff44e5	2026-05-08 01:01:07.676-07	2026-05-08 01:05:28.208-07	\N
30682cc5-1f9b-4566-9bcc-232f2982ea2d	Dermi Emerald	<p>Dermi&nbsp;Emeralds&nbsp;are&nbsp;mined&nbsp;from&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district&nbsp;and&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;bright&nbsp;coloration&nbsp;and&nbsp;transparent&nbsp;crystal&nbsp;quality.&nbsp;These&nbsp;stones&nbsp;are&nbsp;commonly&nbsp;associated&nbsp;with&nbsp;Ethiopia’s&nbsp;newer&nbsp;emerald&nbsp;discoveries&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;the&nbsp;country’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;emerging&nbsp;gemstone&nbsp;source.&nbsp;High-quality&nbsp;Dermi&nbsp;emeralds&nbsp;can&nbsp;display&nbsp;excellent&nbsp;brilliance&nbsp;and&nbsp;vivid&nbsp;green&nbsp;tones.</p><p><strong>Properties:</strong>&nbsp;Bright&nbsp;green&nbsp;color,&nbsp;transparency,&nbsp;natural&nbsp;brilliance.</p><p><strong>Applications:</strong>&nbsp;Jewelry,&nbsp;gemstone&nbsp;investment,&nbsp;premium&nbsp;collections.</p>	Southern Ethiopia, Dermi	da39ee50-d9ee-4672-8a46-233854921a94	2017-03-14 17:00:00-07	4aaeffb6-de37-4bb3-aec3-713784ff44e5	2026-05-08 01:05:06.631-07	2026-05-08 01:05:55.55-07	\N
50c7f91a-1817-49ff-a496-adf315d94f6a	Hydrothermal Emerald	<p>Hydrothermal&nbsp;Ethiopian&nbsp;Emeralds&nbsp;form&nbsp;through&nbsp;mineral-rich&nbsp;fluids&nbsp;moving&nbsp;through&nbsp;schist&nbsp;host&nbsp;rocks&nbsp;deep&nbsp;underground.&nbsp;These&nbsp;emeralds&nbsp;are&nbsp;naturally&nbsp;created&nbsp;over&nbsp;millions&nbsp;of&nbsp;years&nbsp;through&nbsp;geological&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;Their&nbsp;formation&nbsp;process&nbsp;contributes&nbsp;to&nbsp;their&nbsp;vivid&nbsp;color&nbsp;and&nbsp;unique&nbsp;mineral&nbsp;composition.</p><p><strong>Properties:</strong>&nbsp;Hydrothermal&nbsp;formation,&nbsp;schist-hosted&nbsp;structure,&nbsp;rich&nbsp;mineral&nbsp;composition.</p><p><strong>Applications:</strong>&nbsp;Gemstone&nbsp;collections,&nbsp;scientific&nbsp;studies,&nbsp;luxury&nbsp;jewelry.</p>	Oromia Region	a6ca0fbe-9f00-4e9f-8dda-6a9ff30120f8	2016-10-07 17:00:00-07	4aaeffb6-de37-4bb3-aec3-713784ff44e5	2026-05-08 01:11:55.73-07	2026-05-08 01:11:55.73-07	\N
ff3d10f1-7a98-4dce-8a18-7dcae938ca3f	Ethiopian Emerald	<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>	Shakiso, Oromia Region, Ethiopia	acc6bcca-d249-4e78-ad9b-8942da143eb2	2016-11-07 16:00:00-08	\N	2026-05-08 01:14:08.207-07	2026-05-08 01:17:05.428-07	2026-05-08 01:18:20.153-07
4aaeffb6-de37-4bb3-aec3-713784ff44e5	Ethiopian Emerald	<p><strong>Ethiopian&nbsp;Emerald</strong>&nbsp;is&nbsp;one&nbsp;of&nbsp;Africa’s&nbsp;most&nbsp;remarkable&nbsp;modern&nbsp;gemstone&nbsp;discoveries,&nbsp;admired&nbsp;for&nbsp;its&nbsp;vivid&nbsp;electric-green&nbsp;color,&nbsp;natural&nbsp;brilliance,&nbsp;and&nbsp;growing&nbsp;importance&nbsp;in&nbsp;the&nbsp;international&nbsp;gemstone&nbsp;market.&nbsp;Found&nbsp;primarily&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;area&nbsp;of&nbsp;Ethiopia’s&nbsp;Oromia&nbsp;Region,&nbsp;these&nbsp;emeralds&nbsp;are&nbsp;highly&nbsp;valued&nbsp;for&nbsp;their&nbsp;rich&nbsp;color&nbsp;saturation,&nbsp;clarity,&nbsp;and&nbsp;unique&nbsp;geological&nbsp;origin.</p><p>Although&nbsp;emeralds&nbsp;had&nbsp;been&nbsp;discovered&nbsp;sporadically&nbsp;in&nbsp;Ethiopia&nbsp;for&nbsp;decades,&nbsp;a&nbsp;major&nbsp;breakthrough&nbsp;came&nbsp;in&nbsp;2016&nbsp;with&nbsp;the&nbsp;discovery&nbsp;of&nbsp;significant&nbsp;high-quality&nbsp;emerald&nbsp;deposits&nbsp;in&nbsp;the&nbsp;Kenticha&nbsp;and&nbsp;Dermi&nbsp;areas&nbsp;of&nbsp;the&nbsp;Seba&nbsp;Boru&nbsp;district.&nbsp;This&nbsp;discovery&nbsp;introduced&nbsp;a&nbsp;new&nbsp;generation&nbsp;of&nbsp;vibrant&nbsp;Ethiopian&nbsp;emeralds&nbsp;that&nbsp;quickly&nbsp;attracted&nbsp;attention&nbsp;from&nbsp;gem&nbsp;dealers,&nbsp;collectors,&nbsp;and&nbsp;jewelry&nbsp;designers&nbsp;around&nbsp;the&nbsp;world.</p><p>Ethiopian&nbsp;emeralds&nbsp;belong&nbsp;to&nbsp;the&nbsp;mineral&nbsp;family&nbsp;known&nbsp;as&nbsp;beryl&nbsp;and&nbsp;obtain&nbsp;their&nbsp;stunning&nbsp;green&nbsp;coloration&nbsp;from&nbsp;trace&nbsp;amounts&nbsp;of&nbsp;chromium,&nbsp;vanadium,&nbsp;and&nbsp;iron.&nbsp;The&nbsp;finest&nbsp;stones&nbsp;display&nbsp;an&nbsp;intense&nbsp;grass-green&nbsp;to&nbsp;bluish-green&nbsp;hue&nbsp;with&nbsp;exceptional&nbsp;saturation&nbsp;often&nbsp;described&nbsp;as&nbsp;glowing&nbsp;or&nbsp;vibrant&nbsp;in&nbsp;appearance.&nbsp;Some&nbsp;rare&nbsp;specimens&nbsp;also&nbsp;exhibit&nbsp;the&nbsp;highly&nbsp;prized&nbsp;“gota&nbsp;de&nbsp;aceite”&nbsp;or&nbsp;“drop&nbsp;of&nbsp;oil”&nbsp;effect,&nbsp;a&nbsp;soft&nbsp;luminous&nbsp;appearance&nbsp;associated&nbsp;with&nbsp;premium&nbsp;emerald&nbsp;quality.</p><p>These&nbsp;emeralds&nbsp;form&nbsp;naturally&nbsp;within&nbsp;hydrothermal&nbsp;schist&nbsp;deposits&nbsp;created&nbsp;by&nbsp;tectonic&nbsp;and&nbsp;volcanic&nbsp;activity&nbsp;associated&nbsp;with&nbsp;the&nbsp;East&nbsp;African&nbsp;Rift&nbsp;system.&nbsp;This&nbsp;geological&nbsp;environment&nbsp;contributes&nbsp;to&nbsp;the&nbsp;gemstone’s&nbsp;unique&nbsp;crystal&nbsp;structure,&nbsp;mineral&nbsp;composition,&nbsp;and&nbsp;natural&nbsp;inclusions&nbsp;such&nbsp;as&nbsp;biotite&nbsp;and&nbsp;quartz.</p><p>Most&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;mined&nbsp;traditionally&nbsp;by&nbsp;artisanal&nbsp;miners&nbsp;using&nbsp;hand&nbsp;tools&nbsp;rather&nbsp;than&nbsp;heavy&nbsp;machinery.&nbsp;Mining&nbsp;activities&nbsp;in&nbsp;the&nbsp;Shakiso&nbsp;region&nbsp;support&nbsp;thousands&nbsp;of&nbsp;local&nbsp;workers&nbsp;and&nbsp;contribute&nbsp;significantly&nbsp;to&nbsp;Ethiopia’s&nbsp;expanding&nbsp;gemstone&nbsp;and&nbsp;mineral&nbsp;export&nbsp;industry.</p><p>Today,&nbsp;Ethiopian&nbsp;emeralds&nbsp;are&nbsp;valued&nbsp;for&nbsp;their&nbsp;beauty,&nbsp;rarity,&nbsp;durability,&nbsp;and&nbsp;investment&nbsp;potential.&nbsp;Their&nbsp;vivid&nbsp;natural&nbsp;color&nbsp;and&nbsp;increasing&nbsp;recognition&nbsp;continue&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;reputation&nbsp;as&nbsp;an&nbsp;important&nbsp;source&nbsp;of&nbsp;high-quality&nbsp;gemstones.</p><h3><strong>Key&nbsp;Characteristics</strong></h3><ul><li>Intense&nbsp;green&nbsp;to&nbsp;bluish-green&nbsp;coloration</li><li>Strong&nbsp;saturation&nbsp;with&nbsp;glowing&nbsp;appearance</li><li>Naturally&nbsp;formed&nbsp;in&nbsp;hydrothermal&nbsp;schist&nbsp;deposits</li><li>Often&nbsp;untreated&nbsp;or&nbsp;minimally&nbsp;enhanced</li><li>Rare&nbsp;high-clarity&nbsp;stones&nbsp;available</li></ul><h3><strong>Symbolism&nbsp;&amp;&nbsp;Meaning</strong></h3><ul><li>Prosperity&nbsp;and&nbsp;abundance</li><li>Growth,&nbsp;renewal,&nbsp;and&nbsp;harmony</li><li>Wisdom&nbsp;and&nbsp;emotional&nbsp;balance</li><li>Love,&nbsp;loyalty,&nbsp;and&nbsp;success</li><li>Healing&nbsp;and&nbsp;spiritual&nbsp;connection</li></ul><h3><strong>Applications</strong></h3><ul><li>Luxury&nbsp;jewelry&nbsp;and&nbsp;gemstone&nbsp;collections</li><li>Investment-grade&nbsp;gemstones</li><li>Designer&nbsp;rings,&nbsp;pendants,&nbsp;and&nbsp;necklaces</li><li>High-end&nbsp;gemstone&nbsp;exhibitions</li><li>International&nbsp;gem&nbsp;trading&nbsp;markets</li></ul>	Shakiso, Oromia Region, Ethiopia	515894af-3621-4ba3-8f27-a917c1e13060	2016-11-07 16:00:00-08	\N	2026-05-08 00:54:49.757-07	2026-05-08 01:18:49.869-07	\N
\.


--
-- Data for Name: investigate_ethiopia; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.investigate_ethiopia (investigate_ethiopia_id, created_at, updated_at, deleted_at) FROM stdin;
aa8efc7e-7035-4dbc-a272-8d3866e0b652	2026-05-04 02:13:43.598-07	2026-05-04 02:28:02.555-07	\N
\.


--
-- Data for Name: investigation_action; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.investigation_action (investigation_action_id, investigate_ethiopia_id, title, description, action, link, created_at, updated_at, deleted_at) FROM stdin;
a0503185-76f2-4e2f-bc39-c768d0d8d548	aa8efc7e-7035-4dbc-a272-8d3866e0b652	Empowering Sustainable Growth	Join us in transforming Ethiopia into a priority destination for global mining and petroleum investors.	Partner With Us	https://www.mom.gov.et/en/investigating-in-ethiopia	2026-05-04 02:28:02.578-07	2026-05-04 02:28:02.578-07	\N
\.


--
-- Data for Name: investigation_strategy; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.investigation_strategy (investigation_strategy_id, investigate_ethiopia_id, type, icon, title, description, content, tags, attachment_id, link, bg_color, fg_color, created_at, updated_at, deleted_at) FROM stdin;
6d4f09f4-5459-4501-93e5-0b65673b1c01	aa8efc7e-7035-4dbc-a272-8d3866e0b652	headlines	\N	Ministry of Mines (MoM), Ethiopia	National Authority for Mining Sector Regulation and Development	The Ministry of Mines (MoM), reestablished under Proclamation 1097/2018, is the federal body responsible for regulating Ethiopia’s mining sector. It oversees licensing for exploration and mining activities, promotes private sector investment, and implements policy and institutional reforms. The Ministry is focused on modernizing the sector through streamlined procedures, digital systems, and improved governance to enhance efficiency, transparency, and sustainable mineral development in Ethiopia.	\N	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.565-07	2026-05-04 02:28:02.565-07	\N
73af502a-eca5-41dc-be28-1398aef9c8ce	aa8efc7e-7035-4dbc-a272-8d3866e0b652	strategic_minerals	GemIcon	Strategic Minerals	Promoting strategic minerals such as gold, gemstones, tantalum, lithium, potash, iron ore, and industrial minerals.	\N	{Gold,Opal,Emerald,Sapphire,Tantalum,Lithium,Potash,"Iron Ore",Petroleum}	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.567-07	2026-05-04 02:28:02.567-07	\N
4d542e6a-46ce-4c4d-b8fe-af286448ec6f	aa8efc7e-7035-4dbc-a272-8d3866e0b652	autonomy	\N	Autonomous Institutions	\N	\N	\N	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.568-07	2026-05-04 02:28:02.568-07	\N
0f46461e-ba6c-429f-b66c-7ef63b2365db	aa8efc7e-7035-4dbc-a272-8d3866e0b652	autonomous_institutions	Globe2Icon	GSE	Geological Survey of Ethiopia focusing on strengthening the generation and dissemination of geoscience data, drilling and laboratory analysis.	\N	\N	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.57-07	2026-05-04 02:28:02.57-07	\N
e4c7a599-9979-4b0a-8bc7-565df8995c33	aa8efc7e-7035-4dbc-a272-8d3866e0b652	autonomous_institutions	FactoryIcon	EMPBC	The Ethiopian Mineral, Petroleum and Biofuel Corporations (EMPBC) engaged in the commercial activity of mining, petroleum and bio-fuel sectors.	\N	\N	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.57-07	2026-05-04 02:28:02.57-07	\N
69a03987-91d5-4ace-8319-9a201b42b648	aa8efc7e-7035-4dbc-a272-8d3866e0b652	strategic_pillars	Leaf	Sustainability First	Facilitating the positive co-existence of mining operations and agricultural production is a top priority for the Government of Ethiopia. We are working diligently by building global partnerships.	\N	\N	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.571-07	2026-05-04 02:28:02.571-07	\N
a7ac100e-80fb-4994-957b-5d752b796425	aa8efc7e-7035-4dbc-a272-8d3866e0b652	ambition	Globe2	Global & Continental Ambitions	The Ministry's work is firmly guided by international, continental and national ambitions for building 'The Africa We Want'.	\N	\N	\N	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.573-07	2026-05-04 02:28:02.573-07	\N
ec629ef4-10af-4bac-be7b-3fae038fb640	aa8efc7e-7035-4dbc-a272-8d3866e0b652	global_proclamation	\N	UN SDGs	Supporting the United Nations Sustainable Development Goals (SDGs).	\N	\N	3a4411a9-987b-4d7a-a0a8-0edbc9a2413f	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.574-07	2026-05-04 02:28:02.574-07	\N
ddc2bb76-b69c-4dd3-95f4-106b116c770e	aa8efc7e-7035-4dbc-a272-8d3866e0b652	global_proclamation	\N	AU Agenda 2063	Building 'The Africa We Want', CTFA, and the Africa Mining Vision.	\N	\N	0322a67e-278b-4f25-a8e2-5011df89ee7c	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.574-07	2026-05-04 02:28:02.574-07	\N
41c4e114-bba3-4b31-80d6-5a93b09f6ae9	aa8efc7e-7035-4dbc-a272-8d3866e0b652	global_proclamation	\N	IGAD & COMESA	Member of the Intergovernmental Authority on Development and COMESA.	\N	\N	5cb418a7-eb11-42a3-9bc7-b2512a5c4518	\N	#0b102dff	#FFFFFF	2026-05-04 02:28:02.574-07	2026-05-04 02:28:02.574-07	\N
\.


--
-- Data for Name: leadership; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.leadership (leadership_id, header, parent_id, name, title, description, level, is_active, created_at, updated_at, deleted_at) FROM stdin;
df1bca3c-6a77-47f1-97e7-2092c0a2dae2	Minister of Mines	\N	HE. Engineer Habtamu Tegegne	Minister of Mines	H.E. Habtamu Tegegne is the Minister of Mines of Ethiopia and a member of the Prosperity Party. He is dedicated to advancing a modern, transparent, and sustainable mining sector that drives national development and long-term economic growth.	1	t	2026-04-29 00:58:50.487-07	2026-05-04 01:02:55.841-07	\N
5c58dca9-534d-48b2-8a22-1b5881d00775	Minister of Mines	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	HE. Birhanie Yadesa 	State Minister	State Minister of  Mines Resource Development sector	2	t	2026-05-04 00:58:08.335-07	2026-05-04 01:26:43.069-07	\N
e332ce28-e3f4-45f8-9fb3-7d03d75b2236	Minister of Mines	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	HE. Engineer Hana Adnew	State Minister	State Minister of Petroleum and Geothermal resource development Sector	2	t	2026-05-04 00:54:28.356-07	2026-05-04 01:27:33.405-07	\N
\.


--
-- Data for Name: leadership_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.leadership_attachments (leadership_attachment_id, leadership_id, attachment_id, created_at) FROM stdin;
31768790-b0ab-4106-b054-5e9a6859c81b	df1bca3c-6a77-47f1-97e7-2092c0a2dae2	2683be44-e55d-4fe1-bcc4-ecf12c25fb96	2026-05-04 01:02:55.846-07
f92b9278-de7b-47c7-9eec-8a15a4608baf	5c58dca9-534d-48b2-8a22-1b5881d00775	73053c12-06cc-42f8-8d38-bda4036df6b4	2026-05-04 01:26:43.076-07
3bffba1e-0d91-4d27-b65c-071ef2e9d570	e332ce28-e3f4-45f8-9fb3-7d03d75b2236	c7d890ba-0b67-4b77-be32-533d7b98409d	2026-05-04 01:27:33.409-07
\.


--
-- Data for Name: licensing_contacts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.licensing_contacts (licensing_contact_id, regional_office_id, name, email, phone, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages (message_id, full_name, email_address, subject, message, created_at, updated_at, deleted_at) FROM stdin;
5debbf8e-a889-46d0-9671-994c36f7e243	Natan Mesele	natanmesele827@gmail.com	Request for latest Minimum price list for minerals	Dear Ministry of Mines,\nI am writing to kindly request access to the latest official Minimum Price List of Minerals published by your office. This document is important for ensuring compliance with regulations and for guiding investment decisions in the mining sector.\nCould you please provide me with the most recent version of the list, or direct me to the appropriate department or portal where it can be obtained?\nThank you very much for your assistance.\nBest regards, Natan 	2026-05-04 00:24:48.241-07	2026-05-04 00:24:48.241-07	\N
686e9270-b2f7-413f-89b2-ff2f22ea839e	Hawi Marga Kebede	hawimerga13@gmail.com	license	I want to get a license of exporting gemstone, and please can you email me the steps I should follow?  	2026-05-06 01:50:14.353-07	2026-05-06 01:50:14.353-07	\N
94e8a975-3327-4805-be11-a99dc9e6bb62	Robera Uka Lemi	robinmy62@gmail.com	Training 	I want training on the Golden Mountain, when is the training?	2026-05-06 10:49:42.726-07	2026-05-06 10:49:42.726-07	\N
3432269c-c759-4214-ab7a-d4411676921d	Neville Trindade	neville@b2bafrica.co.ke	Exclusive Invitation: Dubai New Horizons Roadshow - Ethiopia | Ministry of Mines - Ethiopia	Dear HE. Engineer Habtamu Tegegne,\n\nOn behalf of Dubai Chambers, it is our pleasure to extend an invitation to Ministry of Mines - Ethiopia to participate in the high-level B2B Matchmaking Engagements as part of the Dubai New Horizons Roadshow: Ethiopia, taking place on Thursday, 21st May 2026 at the Sheraton Addis Hotel from 09:00 to 17:00.\n\nThis exclusive engagement has been carefully curated to facilitate strategic dialogue between leading UAE enterprises and prominent Ethiopian counterparts. The programme will convene a select group of invited senior executives, investors, and key public, private and government sector stakeholders to explore opportunities for trade expansion, investment partnerships, and long-term collaboration. The Roadshow will bring together decision-makers from across various sectors, including importers, exporters, distributors, investors, large enterprises, and government representatives, fostering a highly targeted environment for impactful business exchange.\n\nWe would be honoured by the participation of your leadership and remain committed to ensuring a tailored and productive engagement aligned with your strategic priorities. Please find attached the profiles of the participating companies from Dubai. Kindly let us know which companies you would like us to prioritize for your meetings. If you have any specific requirements or would like to highlight priority areas of interest in advance, please feel free to share them with us.\n\nTo confirm your participation and enable us to curate meetings of the highest relevance, we kindly request that you complete the registration form at your earliest convenience using the link below:\nRegistration: https://forms.gle/7qmPQ65rwUSEMcRW9 \n*Upon receipt of your registration, a formal confirmation along with your personalized meeting schedule will be shared. Attending the event is free of cost and by invite only.\n\nThe information provided will allow us to:\n• Curate bespoke meetings with carefully selected UAE counterparts\n• Facilitate high-value, one-on-one engagements with key decision-makers\n• Maximise strategic outcomes and partnership opportunities during the Roadshow\n\nWe very much look forward to welcoming you, and to facilitating meaningful engagements during this distinguished gathering.\nIf there are any companies or individuals in Ethiopia you believe would particularly benefit from in this event, we would appreciate you sharing their contact details so we may extend a personalized invitation with your reference.\n\nI am looking forward to meeting you in person at the event.\nRegards,\n\nNeville Trindade\nManaging Partner\n	2026-05-09 05:24:33.74-07	2026-05-09 05:24:33.74-07	\N
22886985-3261-403e-b5b1-6340b80662be	Messay Abera	Messayabera5@gmail.com	Mine 	Hi, sorry for my english and i think i got a cilcite mine in my area around east gojjam so please contact me.	2026-05-11 06:03:35.179-07	2026-05-11 06:03:35.179-07	\N
bbb32c21-3fae-44ff-a5c5-298c78f1290a	Abubakar Musa 	abubakarmzeemusa@gmail.com	Investing in buying and exporting gold 	Dear Sir,\nWe are looking to invest in buying and exporting gold from Khartoum. Kindly could you please advice us on how we can apply for minerals dealers trading license and how much is the government taxes for exporting gold from Khartoum.\nRegards \nAbubakar Musa 	2026-05-15 01:22:11.864-07	2026-05-15 01:22:11.864-07	\N
84ad0556-e47d-444f-8255-7b132066a2fd	Ahmed	Mahadallah14@gmail.com	Information	Iam member of cooperative gemstons from somali region so i need where can i direct to my sample	2026-05-25 10:50:50.426-07	2026-05-25 10:50:50.426-07	\N
a5e1341c-3d79-4c15-8dfd-47dd2618c7e3	Hassen 	hasanidiris89@gmail.com	Copper 	I am translator foreigner want to explot copper from Ethiopia I need information concerning the procedure to invest in Ethiopia 	2026-06-05 04:57:01.313-07	2026-06-05 04:57:01.313-07	\N
e5a9ddb8-238a-4789-9bd7-6bf85b87eddf	Ma Kailasa	ma.kailaasa@gmail.com	Reliable source of gold	Good day!\n\nI am representative of gold trading company in Dubai. We would like to source reliable long term suppliers for gold. Will you be able to assist us with this. Thank you!	2026-06-08 03:00:02.854-07	2026-06-08 03:00:02.854-07	\N
58bb5192-f7f0-4e2d-83fa-faf2996813b0	Ezadin sherif Abdalla 	beyyaamtubee@gmail.com	Ittin fayyadamaa albuudaalee 	Maalif albuudaalee biyyaa kenyaa kessaa jiraattu hin fayyadamnee. Fakenyaaf My GPS coordinates:   Latitude: 7.467884  Longitude: 37.25202  naannoo kanarra kan jirutti	2026-06-10 17:02:56.639-07	2026-06-10 17:02:56.639-07	\N
7bce34c8-2335-436a-8d9b-17dbb882e56e	Mohammed mahamud ahmed	mohammedmahamud445@gmail.com	Albuuda sibilaa magineti 	Ani albuuda sibilaa magineti harkisu argadhe akkafu akka degarsa naf gootan kabajaan isin gafadha 	2026-06-11 07:15:55.401-07	2026-06-11 07:15:55.401-07	\N
2f2332de-ab1a-4f77-a4d8-448f07895886	samuel sileshi	samuel@akobominerals.com	Registered Explosive / Detonators suppliers in Addis	Could you provide a registered list off suppliers in Ethiopia\nThis on behalf off Akobo / Etno Minerals	2026-06-17 01:51:23.967-07	2026-06-17 01:51:23.967-07	\N
\.


--
-- Data for Name: mining_application_process; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_application_process (mining_application_process_id, title, description, objectives, publish, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: mining_application_process_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_application_process_attachments (mining_application_process_attachment_id, mining_application_process_id, attachment_id, overlay_text, overlay_icon, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mining_application_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_application_types (mining_application_types_id, mining_application_process_id, icon, title, requirements, steps, action_label, action_url, color, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: mining_framework; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_framework (mining_framework_id, mining_regulation_process_id, title, description, objectives, attachment_id, attachment_overlay_text, attachment_overlay_color, created_at, updated_at, deleted_at) FROM stdin;
3909b5ea-11a5-476e-a1d8-b9399eeeb606	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Royalties	Ethiopia has some of the most attractive royalty rates in Africa. The holders of Large Scale Mineral Operations Licenses are required to pay royalties.	[" Precious minerals 7%","Metallic minerals 5%"]	7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	Royalty Framework	#ffffff	2026-04-29 05:09:03.763-07	2026-04-29 05:09:03.763-07	2026-04-29 05:10:13.656-07
deb6904b-9d04-41c4-89b7-226900c7cd50	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Royalties	Ethiopia has some of the most attractive royalty rates in Africa. The holders of Large Scale Mineral Operations Licenses are required to pay royalties.	[" Precious minerals 7%","Metallic minerals 5%"]	7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	Royalty Framework	#ffffff	2026-04-29 05:10:13.659-07	2026-04-29 05:10:13.659-07	2026-04-29 05:30:47.728-07
f9ffb4f3-bde3-49e6-9249-3c18946b7097	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Royalties	Ethiopia has some of the most attractive royalty rates in Africa. The holders of Large Scale Mineral Operations Licenses are required to pay royalties.	[" Precious minerals 7%","Metallic minerals 5%"]	7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	Royalty Framework	#ffffff	2026-04-29 05:30:47.73-07	2026-04-29 05:30:47.73-07	2026-05-06 00:47:54.64-07
c1a9e874-81f3-4e18-bf69-af2594848f67	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Royalties	Ethiopia has some of the most attractive royalty rates in Africa. The holders of Large Scale Mineral Operations Licenses are required to pay royalties.	[" Precious minerals 7%","Metallic minerals 5%"]	7d42526e-6b06-4d78-8a0a-ffa6d2ae9c45	Royalty Framework	#ffffff	2026-05-06 00:47:54.642-07	2026-05-06 00:47:54.642-07	\N
\.


--
-- Data for Name: mining_guideline; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_guideline (mining_guideline_id, mining_regulation_process_id, icon, title, description, created_at, updated_at, deleted_at) FROM stdin;
757f7db0-17d0-4bd6-8912-c519954263fb	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	ArrowUpLeftSquareIcon	Operational Guidelines	We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties	2026-04-29 05:09:03.767-07	2026-04-29 05:09:03.767-07	2026-04-29 05:10:13.657-07
7e7a8f03-0fda-48bf-9cba-07503e6f67ec	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	FileChartColumnIncreasingIcon	Important Directives	\N	2026-04-29 05:09:03.771-07	2026-04-29 05:09:03.771-07	2026-04-29 05:10:13.657-07
c8092019-b2e9-4f39-bc3f-608a1f22b034	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	FileChartColumnIncreasingIcon	Important Directives	\N	2026-04-29 05:10:13.661-07	2026-04-29 05:10:13.661-07	2026-04-29 05:30:47.729-07
b2fbf997-0ce4-4921-99e0-4269a78786df	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	ArrowUpLeftSquareIcon	Operational Guidelines	We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties	2026-04-29 05:10:13.665-07	2026-04-29 05:10:13.665-07	2026-04-29 05:30:47.729-07
804201d0-c381-4e3c-b1c6-1ae46b403855	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	FileChartColumnIncreasingIcon	Important Directives	\N	2026-04-29 05:30:47.731-07	2026-04-29 05:30:47.731-07	2026-05-06 00:47:54.641-07
bf4aac2e-92d3-4828-b201-6d6197f6ec6a	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	ArrowUpLeftSquareIcon	Operational Guidelines	We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties	2026-04-29 05:30:47.734-07	2026-04-29 05:30:47.734-07	2026-05-06 00:47:54.641-07
53cf7e4d-e3c4-44c6-a822-924e598c653b	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	FileChartColumnIncreasingIcon	Important Directives	\N	2026-05-06 00:47:54.644-07	2026-05-06 00:47:54.644-07	\N
7892358a-ddf5-4148-bc6c-1e205209af3b	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	ArrowUpLeftSquareIcon	Operational Guidelines	We would ask holders of such licenses to be in touch with the relevant Regional State official to determine the amounts they are required to pay in royalties	2026-05-06 00:47:54.649-07	2026-05-06 00:47:54.649-07	\N
\.


--
-- Data for Name: mining_guideline_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_guideline_attachments (mining_guideline_attachment_id, mining_guideline_id, attachment_id, label, created_at) FROM stdin;
3c602202-c5de-4c31-aa94-5854c42ffa95	7e7a8f03-0fda-48bf-9cba-07503e6f67ec	3afacb79-8d28-4c0d-b6ad-42ac284dad05	Area Limit	2026-04-29 05:09:03.773-07
394ce222-9242-4770-984b-980cfa224f58	7e7a8f03-0fda-48bf-9cba-07503e6f67ec	9667d5ce-718e-42fd-9cad-db271263a6eb	Duty Free	2026-04-29 05:09:03.773-07
c26cbccd-4b2d-4f4b-8e31-2613c5a39b4d	7e7a8f03-0fda-48bf-9cba-07503e6f67ec	0db1123d-12cc-4bfe-82d0-5760a7f7e8db	Exploration Directive	2026-04-29 05:09:03.773-07
e781a47e-733b-4b08-b2e6-cfc73e44c2a8	c8092019-b2e9-4f39-bc3f-608a1f22b034	3afacb79-8d28-4c0d-b6ad-42ac284dad05	Area Limit	2026-04-29 05:10:13.663-07
6b716f98-9651-4a0a-afa8-5677971e94bd	c8092019-b2e9-4f39-bc3f-608a1f22b034	9667d5ce-718e-42fd-9cad-db271263a6eb	Duty Free	2026-04-29 05:10:13.663-07
2c3747ef-138e-4f35-b3c8-7190275a104d	c8092019-b2e9-4f39-bc3f-608a1f22b034	0db1123d-12cc-4bfe-82d0-5760a7f7e8db	Exploration Directive	2026-04-29 05:10:13.663-07
531cac42-8f98-4ad0-bd4e-76a858dafafe	804201d0-c381-4e3c-b1c6-1ae46b403855	3afacb79-8d28-4c0d-b6ad-42ac284dad05	Area Limit	2026-04-29 05:30:47.733-07
54d294a6-664b-4973-9196-6f551df00d60	804201d0-c381-4e3c-b1c6-1ae46b403855	9667d5ce-718e-42fd-9cad-db271263a6eb	Duty Free	2026-04-29 05:30:47.733-07
2dcc9b54-30e8-483e-ab9f-ebfc29801a19	804201d0-c381-4e3c-b1c6-1ae46b403855	0db1123d-12cc-4bfe-82d0-5760a7f7e8db	Exploration Directive	2026-04-29 05:30:47.733-07
e456619e-86a0-4d03-8a31-7becb76bc554	53cf7e4d-e3c4-44c6-a822-924e598c653b	3afacb79-8d28-4c0d-b6ad-42ac284dad05	Area Limit	2026-05-06 00:47:54.648-07
5aa1be6b-be45-45c8-ba78-8649bda9875f	53cf7e4d-e3c4-44c6-a822-924e598c653b	9667d5ce-718e-42fd-9cad-db271263a6eb	Duty Free	2026-05-06 00:47:54.648-07
50e651c2-6750-4f42-8725-60f8039d5461	53cf7e4d-e3c4-44c6-a822-924e598c653b	0db1123d-12cc-4bfe-82d0-5760a7f7e8db	Exploration Directive	2026-05-06 00:47:54.648-07
\.


--
-- Data for Name: mining_guideline_content; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_guideline_content (mining_guideline_content_id, mining_guideline_id, type, bg_color, icon, stamp, title, description, created_at, updated_at, deleted_at) FROM stdin;
aecca982-54fb-4434-b929-45852b217e48	757f7db0-17d0-4bd6-8912-c519954263fb	card	\N	File	\N	Construction minerals 3%	\nConstruction minerals 3%	2026-04-29 05:09:03.769-07	2026-04-29 05:09:03.769-07	\N
098f3f04-42b0-4d72-9df7-fd84cac16144	b2fbf997-0ce4-4921-99e0-4269a78786df	card	\N	File	\N	Construction minerals 3%	\nConstruction minerals 3%	2026-04-29 05:10:13.667-07	2026-04-29 05:10:13.667-07	\N
061c13bc-bfa3-4c51-b32c-365453293cbb	bf4aac2e-92d3-4828-b201-6d6197f6ec6a	card	\N	File	\N	Construction minerals 3%	\nConstruction minerals 3%	2026-04-29 05:30:47.736-07	2026-04-29 05:30:47.736-07	\N
e401c55a-183b-4087-8d6a-001c499495ec	7892358a-ddf5-4148-bc6c-1e205209af3b	card	\N	File	\N	Construction minerals 3%	\nConstruction minerals 3%	2026-05-06 00:47:54.652-07	2026-05-06 00:47:54.652-07	\N
\.


--
-- Data for Name: mining_regulation_process; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_regulation_process (mining_regulation_process_id, title, description, publish, created_at, updated_at, deleted_at) FROM stdin;
6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Mining Licensing and Legislations	Ethiopia has a stable legal and regulatory framework in place. For the sake of convenience, the most important of Ethiopia’s Federal mining laws are summarized below.	f	2026-04-29 05:09:03.759-07	2026-05-06 00:48:46.487-07	\N
\.


--
-- Data for Name: mining_service; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_service (mining_service_id, mining_regulation_process_id, title, description, created_at, updated_at, deleted_at) FROM stdin;
8812cd21-83d1-491b-b804-f0a76f6d6bbf	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Licensing  Service	The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:	2026-04-29 05:09:03.775-07	2026-04-29 05:09:03.775-07	2026-04-29 05:10:13.658-07
af1086ab-d7e7-4c5e-ac98-30aa76a3fdc8	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Licensing  Service	The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:	2026-04-29 05:10:13.669-07	2026-04-29 05:10:13.669-07	2026-04-29 05:30:47.729-07
33adf720-28c4-4bf1-89be-f3865a85d87c	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Licensing  Service	The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:	2026-04-29 05:30:47.737-07	2026-04-29 05:30:47.737-07	2026-05-06 00:47:54.642-07
14996dc6-4bb3-4f4e-9418-6574c7745941	6cfe5e47-76d0-483f-9e6f-58e00375c2ac	Licensing  Service	The MoMP issues seven (7) types of mining license, known officially as ‘mineral operations licences’, in total. These are:	2026-05-06 00:47:54.653-07	2026-05-06 00:47:54.653-07	\N
\.


--
-- Data for Name: mining_service_card; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mining_service_card (mining_service_card_id, mining_service_id, title, sub_title, sub_title_color, icon, description, requirements, created_at, updated_at, deleted_at) FROM stdin;
c12ef0a8-9094-410d-8c94-6bfb51f58894	8812cd21-83d1-491b-b804-f0a76f6d6bbf	Reconnaissance License	Duration: 18 month	#f8f521ff	FileTextIcon	A Reconnaissance License allows its holders to do a general search for any mineral in a particular region. It is issued for an 18 month period, and is non-renewable and non-exclusive.	["Application Submission","Document Review","Area Clearance","Approval & Licensing"]	2026-04-29 05:09:03.777-07	2026-04-29 05:09:03.777-07	\N
893038e9-85b5-49f5-b702-82d9f123e382	af1086ab-d7e7-4c5e-ac98-30aa76a3fdc8	Reconnaissance License	Duration: 18 month	#f8f521ff	FileTextIcon	A Reconnaissance License allows its holders to do a general search for any mineral in a particular region. It is issued for an 18 month period, and is non-renewable and non-exclusive.	["Application Submission","Document Review","Area Clearance","Approval & Licensing"]	2026-04-29 05:10:13.671-07	2026-04-29 05:10:13.671-07	\N
ecb4bc0e-2021-475f-84cc-9feb06bc6eaf	33adf720-28c4-4bf1-89be-f3865a85d87c	Reconnaissance License	Duration: 18 month	#f8f521ff	FileTextIcon	A Reconnaissance License allows its holders to do a general search for any mineral in a particular region. It is issued for an 18 month period, and is non-renewable and non-exclusive.	["Application Submission","Document Review","Area Clearance","Approval & Licensing"]	2026-04-29 05:30:47.739-07	2026-04-29 05:30:47.739-07	\N
96530c3c-a206-48d2-b9d9-0f026769b8df	14996dc6-4bb3-4f4e-9418-6574c7745941	Reconnaissance License	Duration: 18 month	#f8f521ff	FileTextIcon	A Reconnaissance License allows its holders to do a general search for any mineral in a particular region. It is issued for an 18 month period, and is non-renewable and non-exclusive.	["Application Submission","Document Review","Area Clearance","Approval & Licensing"]	2026-05-06 00:47:54.654-07	2026-05-06 00:47:54.654-07	\N
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news (news_id, title, content, author, status, published_at, created_at, updated_at, deleted_at) FROM stdin;
2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	Rapid Completion of Mining Projects is Transforming Work Culture	"<p><strong><em>(Megabit&nbsp;14,&nbsp;2018&nbsp;E.C.,&nbsp;Ministry&nbsp;of&nbsp;Mines)</em></strong>&nbsp;Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs&nbsp;visited&nbsp;the&nbsp;construction&nbsp;site&nbsp;of&nbsp;the&nbsp;Baijia&nbsp;Ceramics&nbsp;Factory.&nbsp;The&nbsp;committee&nbsp;noted&nbsp;that&nbsp;the&nbsp;rapid&nbsp;progress&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;within&nbsp;a&nbsp;short&nbsp;period&nbsp;reflects&nbsp;a&nbsp;positive&nbsp;transformation&nbsp;in&nbsp;work&nbsp;culture.</p><p></p><p>Members&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;from&nbsp;the&nbsp;House&nbsp;of&nbsp;Peoples’&nbsp;Representatives&nbsp;observed&nbsp;that&nbsp;the&nbsp;first&nbsp;phase&nbsp;of&nbsp;the&nbsp;factory’s&nbsp;construction&nbsp;has&nbsp;been&nbsp;completed&nbsp;quickly&nbsp;and&nbsp;is&nbsp;now&nbsp;nearing&nbsp;readiness&nbsp;for&nbsp;production.</p><p></p><p>The&nbsp;factory&nbsp;is&nbsp;one&nbsp;of&nbsp;the&nbsp;key&nbsp;projects&nbsp;aimed&nbsp;at&nbsp;fully&nbsp;substituting&nbsp;imported&nbsp;products&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;As&nbsp;such,&nbsp;it&nbsp;plays&nbsp;an&nbsp;important&nbsp;role&nbsp;in&nbsp;utilizing&nbsp;national&nbsp;resources&nbsp;for&nbsp;domestic&nbsp;benefit.&nbsp;The&nbsp;committee&nbsp;members&nbsp;also&nbsp;expressed&nbsp;their&nbsp;support&nbsp;for&nbsp;the&nbsp;project.</p><p>The&nbsp;Deputy&nbsp;Chairperson&nbsp;of&nbsp;the&nbsp;Standing&nbsp;Committee&nbsp;on&nbsp;Industry&nbsp;and&nbsp;Mining&nbsp;Affairs,&nbsp;H.E.&nbsp;Fikadu&nbsp;Mengistu&nbsp;(PhD),&nbsp;emphasized&nbsp;that&nbsp;the&nbsp;government&nbsp;is&nbsp;giving&nbsp;high&nbsp;priority&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;He&nbsp;also&nbsp;noted&nbsp;that&nbsp;the&nbsp;Ministry&nbsp;is&nbsp;actively&nbsp;working&nbsp;with&nbsp;a&nbsp;strong&nbsp;focus&nbsp;on&nbsp;import&nbsp;substitution&nbsp;projects.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><em>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a>_</em></p><p><em>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><em>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><em>Email:&nbsp;info@mom.gov.et</em></p>"	Minstry of MInes	published	2026-03-22 02:50:00-07	2026-05-05 23:54:34.233-07	2026-05-05 23:57:36.218-07	\N
760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	Over USD 3.5 Billion Revenue Generated from the Mining Sector in the Past 8 Months	"<p>The&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;together&nbsp;with&nbsp;its&nbsp;affiliated&nbsp;institutions,&nbsp;conducted&nbsp;a&nbsp;joint&nbsp;review&nbsp;of&nbsp;the&nbsp;mining&nbsp;sector’s&nbsp;performance&nbsp;over&nbsp;the&nbsp;past&nbsp;eight&nbsp;months.</p><p></p><p>During&nbsp;this&nbsp;period,&nbsp;more&nbsp;than&nbsp;<strong>USD&nbsp;3.5&nbsp;billion&nbsp;in&nbsp;foreign&nbsp;exchange&nbsp;earnings</strong>&nbsp;was&nbsp;generated&nbsp;from&nbsp;gold,&nbsp;gemstones,&nbsp;and&nbsp;industrial&nbsp;minerals.&nbsp;Compared&nbsp;to&nbsp;the&nbsp;same&nbsp;period&nbsp;last&nbsp;year,&nbsp;this&nbsp;represents&nbsp;a&nbsp;<strong>27%&nbsp;increase&nbsp;in&nbsp;production&nbsp;volume</strong>&nbsp;and&nbsp;a&nbsp;<strong>92%&nbsp;increase&nbsp;in&nbsp;revenue</strong>.</p><p>Several&nbsp;mining&nbsp;projects&nbsp;were&nbsp;inaugurated&nbsp;and&nbsp;became&nbsp;operational&nbsp;during&nbsp;the&nbsp;fiscal&nbsp;year,&nbsp;contributing&nbsp;to&nbsp;improved&nbsp;performance&nbsp;in&nbsp;both&nbsp;exports&nbsp;and&nbsp;import&nbsp;substitution.&nbsp;The&nbsp;Ministry&nbsp;also&nbsp;emphasized&nbsp;that&nbsp;ongoing&nbsp;mega&nbsp;projects&nbsp;will&nbsp;continue&nbsp;to&nbsp;receive&nbsp;the&nbsp;necessary&nbsp;support&nbsp;to&nbsp;ensure&nbsp;they&nbsp;become&nbsp;operational&nbsp;in&nbsp;the&nbsp;coming&nbsp;months.</p><p>Directions&nbsp;have&nbsp;been&nbsp;set&nbsp;to&nbsp;sustain&nbsp;and&nbsp;further&nbsp;enhance&nbsp;the&nbsp;current&nbsp;achievements&nbsp;by&nbsp;focusing&nbsp;on&nbsp;key&nbsp;priority&nbsp;areas&nbsp;in&nbsp;the&nbsp;sector.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p>Twitter:&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a></p><p>Facebook:&nbsp;<a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></p><p>Telegram:&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></p>"	Minstry of Mines	published	2026-03-26 18:01:00-07	2026-05-06 00:04:51.293-07	2026-05-06 00:24:26.087-07	\N
3d973a7d-6922-48df-9845-521a91d3e4fc	Grandier Ceramic Manufacturing Factory Inaugurated in Mojo, Marking Major Milestone for Ethiopia’s Industrial Transformation	"<p><strong>Mojo,&nbsp;Ethiopia</strong>&nbsp;–&nbsp;Prime&nbsp;Minister&nbsp;Abiy&nbsp;Ahmed,&nbsp;together&nbsp;with&nbsp;senior&nbsp;government&nbsp;officials,&nbsp;has&nbsp;inaugurated&nbsp;the&nbsp;newly&nbsp;established&nbsp;<strong>Grandier&nbsp;Ceramic&nbsp;Manufacturing&nbsp;Factory</strong>&nbsp;in&nbsp;Mojo&nbsp;Town,&nbsp;a&nbsp;landmark&nbsp;industrial&nbsp;investment&nbsp;expected&nbsp;to&nbsp;strengthen&nbsp;Ethiopia’s&nbsp;manufacturing&nbsp;sector&nbsp;and&nbsp;reduce&nbsp;reliance&nbsp;on&nbsp;imported&nbsp;construction&nbsp;materials.</p><p>Constructed&nbsp;by&nbsp;<strong>Grandier&nbsp;Ceramic&nbsp;Manufacturing&nbsp;PLC</strong>,&nbsp;the&nbsp;factory&nbsp;was&nbsp;completed&nbsp;in&nbsp;just&nbsp;<strong>nine&nbsp;months</strong>,&nbsp;from&nbsp;planning&nbsp;and&nbsp;land&nbsp;preparation&nbsp;to&nbsp;full&nbsp;operational&nbsp;launch.&nbsp;Built&nbsp;on&nbsp;a&nbsp;<strong>300,000-square-meter&nbsp;site</strong>,&nbsp;the&nbsp;facility&nbsp;is&nbsp;designed&nbsp;to&nbsp;produce&nbsp;internationally&nbsp;standardized&nbsp;ceramic&nbsp;and&nbsp;porcelain&nbsp;tiles,&nbsp;positioning&nbsp;itself&nbsp;among&nbsp;Ethiopia’s&nbsp;most&nbsp;significant&nbsp;industrial&nbsp;manufacturing&nbsp;projects.</p><p>The&nbsp;factory&nbsp;has&nbsp;already&nbsp;begun&nbsp;large-scale&nbsp;production&nbsp;of&nbsp;<strong>60×60&nbsp;ceramic&nbsp;tiles</strong>&nbsp;and&nbsp;is&nbsp;expected&nbsp;to&nbsp;expand&nbsp;its&nbsp;product&nbsp;range&nbsp;within&nbsp;the&nbsp;next&nbsp;two&nbsp;months.&nbsp;Future&nbsp;production&nbsp;lines&nbsp;will&nbsp;include&nbsp;<strong>80×80,&nbsp;60×120,&nbsp;70×140,&nbsp;and&nbsp;80×160&nbsp;tile&nbsp;formats</strong>,&nbsp;as&nbsp;well&nbsp;as&nbsp;premium&nbsp;porcelain&nbsp;products&nbsp;that&nbsp;meet&nbsp;European&nbsp;quality&nbsp;standards.</p><p>With&nbsp;an&nbsp;investment&nbsp;exceeding&nbsp;<strong>2&nbsp;billion&nbsp;Ethiopian&nbsp;Birr</strong>,&nbsp;the&nbsp;project&nbsp;represents&nbsp;a&nbsp;significant&nbsp;chapter&nbsp;in&nbsp;Ethiopia’s&nbsp;ongoing&nbsp;industrialization&nbsp;journey.&nbsp;The&nbsp;factory&nbsp;is&nbsp;expected&nbsp;to&nbsp;contribute&nbsp;substantially&nbsp;to&nbsp;the&nbsp;country’s&nbsp;efforts&nbsp;to&nbsp;promote&nbsp;domestic&nbsp;manufacturing,&nbsp;create&nbsp;jobs,&nbsp;and&nbsp;enhance&nbsp;value-added&nbsp;production.</p><p>A&nbsp;key&nbsp;feature&nbsp;of&nbsp;the&nbsp;project&nbsp;is&nbsp;its&nbsp;strong&nbsp;local&nbsp;supply&nbsp;chain&nbsp;integration.&nbsp;Approximately&nbsp;<strong>80&nbsp;percent&nbsp;of&nbsp;the&nbsp;raw&nbsp;materials&nbsp;required&nbsp;for&nbsp;production&nbsp;are&nbsp;sourced&nbsp;within&nbsp;a&nbsp;100-kilometer&nbsp;radius&nbsp;of&nbsp;the&nbsp;factory</strong>,&nbsp;creating&nbsp;close&nbsp;links&nbsp;with&nbsp;surrounding&nbsp;communities&nbsp;and&nbsp;supporting&nbsp;local&nbsp;economic&nbsp;development.</p><p>The&nbsp;inauguration&nbsp;comes&nbsp;at&nbsp;a&nbsp;time&nbsp;when&nbsp;Ethiopia&nbsp;is&nbsp;intensifying&nbsp;its&nbsp;import-substitution&nbsp;strategy.&nbsp;According&nbsp;to&nbsp;government&nbsp;figures,&nbsp;the&nbsp;country&nbsp;has&nbsp;saved&nbsp;more&nbsp;than&nbsp;<strong>USD&nbsp;4.85&nbsp;billion&nbsp;in&nbsp;foreign&nbsp;exchange&nbsp;over&nbsp;the&nbsp;past&nbsp;nine&nbsp;months</strong>&nbsp;by&nbsp;replacing&nbsp;imported&nbsp;goods&nbsp;with&nbsp;locally&nbsp;produced&nbsp;alternatives.&nbsp;The&nbsp;opening&nbsp;of&nbsp;Grandier&nbsp;Ceramic&nbsp;Factory&nbsp;is&nbsp;expected&nbsp;to&nbsp;further&nbsp;reduce&nbsp;dependence&nbsp;on&nbsp;imported&nbsp;ceramic&nbsp;products&nbsp;while&nbsp;enhancing&nbsp;Ethiopia’s&nbsp;competitiveness&nbsp;in&nbsp;regional&nbsp;and&nbsp;international&nbsp;markets.</p><p>Government&nbsp;officials&nbsp;highlighted&nbsp;the&nbsp;factory&nbsp;as&nbsp;an&nbsp;example&nbsp;of&nbsp;how&nbsp;strategic&nbsp;industrial&nbsp;investments&nbsp;can&nbsp;accelerate&nbsp;economic&nbsp;transformation,&nbsp;strengthen&nbsp;domestic&nbsp;production&nbsp;capacity,&nbsp;and&nbsp;contribute&nbsp;to&nbsp;sustainable&nbsp;economic&nbsp;growth.</p><p>The&nbsp;launch&nbsp;of&nbsp;the&nbsp;Grandier&nbsp;Ceramic&nbsp;Manufacturing&nbsp;Factory&nbsp;underscores&nbsp;Ethiopia’s&nbsp;commitment&nbsp;to&nbsp;expanding&nbsp;its&nbsp;industrial&nbsp;base&nbsp;and&nbsp;fostering&nbsp;a&nbsp;more&nbsp;resilient,&nbsp;self-reliant&nbsp;economy&nbsp;capable&nbsp;of&nbsp;competing&nbsp;in&nbsp;the&nbsp;global&nbsp;marketplace.</p>"	Minstry of Mines	draft	\N	2026-06-07 23:21:29.525-07	2026-06-07 23:21:29.525-07	\N
c9f69b86-b02f-4e0a-9c42-9520683613aa	Support Provided to Muslim Employees on the Occasion of Eid al-Fitr	"<p><strong><em>(Megabit&nbsp;10,&nbsp;2018&nbsp;E.C.)</em></strong>&nbsp;Financial&nbsp;and&nbsp;material&nbsp;support&nbsp;was&nbsp;extended&nbsp;to&nbsp;Muslim&nbsp;employees&nbsp;of&nbsp;the&nbsp;Ministry&nbsp;of&nbsp;Mines,&nbsp;the&nbsp;Ethiopian&nbsp;Geological&nbsp;Institute,&nbsp;and&nbsp;the&nbsp;Mining&nbsp;Industry&nbsp;Development&nbsp;Institute&nbsp;in&nbsp;celebration&nbsp;of&nbsp;Eid&nbsp;al-Fitr.</p><p></p><p>This&nbsp;initiative&nbsp;was&nbsp;organized&nbsp;not&nbsp;only&nbsp;to&nbsp;assist&nbsp;employees&nbsp;during&nbsp;the&nbsp;holiday&nbsp;but&nbsp;also&nbsp;to&nbsp;express&nbsp;appreciation,&nbsp;solidarity,&nbsp;and&nbsp;recognition&nbsp;of&nbsp;their&nbsp;contributions&nbsp;to&nbsp;the&nbsp;mining&nbsp;sector.&nbsp;It&nbsp;reflects&nbsp;the&nbsp;institutions’&nbsp;commitment&nbsp;to&nbsp;fostering&nbsp;an&nbsp;inclusive&nbsp;and&nbsp;supportive&nbsp;workplace&nbsp;culture&nbsp;that&nbsp;respects&nbsp;religious&nbsp;and&nbsp;cultural&nbsp;values.&nbsp;By&nbsp;marking&nbsp;this&nbsp;important&nbsp;occasion,&nbsp;the&nbsp;Ministry&nbsp;and&nbsp;its&nbsp;affiliated&nbsp;institutions&nbsp;aim&nbsp;to&nbsp;strengthen&nbsp;unity,&nbsp;morale,&nbsp;and&nbsp;a&nbsp;sense&nbsp;of&nbsp;community&nbsp;among&nbsp;employees.</p><p></p><p>The&nbsp;support&nbsp;also&nbsp;served&nbsp;as&nbsp;a&nbsp;gesture&nbsp;of&nbsp;goodwill,&nbsp;conveying&nbsp;warm&nbsp;Eid&nbsp;greetings&nbsp;and&nbsp;best&nbsp;wishes&nbsp;to&nbsp;Muslim&nbsp;staff&nbsp;across&nbsp;the&nbsp;sector.</p><p></p><p><strong>For&nbsp;more&nbsp;information:</strong></p><p><strong><em>Twitter:</em></strong><em>&nbsp;<a href=\\"https://twitter.com/MinistryofMine\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://twitter.com/MinistryofMine</a></em></p><p><strong><em>Facebook:&nbsp;</em></strong><em><a href=\\"https://www.facebook.com/MinesandPetroleum/\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://www.facebook.com/MinesandPetroleum/</a></em></p><p><strong><em>Telegram:</em></strong><em>&nbsp;<a href=\\"https://t.me/+-aNetmkG-WY2YWM8\\" rel=\\"noopener noreferrer\\" target=\\"_blank\\">https://t.me/+-aNetmkG-WY2YWM8</a></em></p><p><strong><em>Email:</em></strong><em>&nbsp;info@mom.gov.et</em></p>"	Minstry of Mines	published	2026-03-18 17:39:00-07	2026-05-05 23:44:54.851-07	2026-05-05 23:58:44.39-07	\N
\.


--
-- Data for Name: news_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_attachments (news_attachment_id, news_id, attachment_id, category, created_at) FROM stdin;
2d27f552-5839-49c8-98a8-922381ccd162	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	bf4fa4d0-de4a-42a9-8b05-d5e86ba68569	headline	2026-05-05 23:57:36.224-07
866c7811-b569-4414-ad43-2882cfb8fb9c	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	e05d8984-7cec-4f45-9210-8b8bf89e57f6	headline	2026-05-05 23:57:36.224-07
c0959f47-1779-4494-b9e0-64a319f8bafc	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	9fd1eb29-7cb4-4c9a-b394-1911f92f07b1	headline	2026-05-05 23:57:36.224-07
9b3612a9-47c3-43af-a830-4aabe36bfb31	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	95791248-c580-4f26-95fe-3a7abba27676	headline	2026-05-05 23:57:36.224-07
6779338b-b867-4ece-98c4-38c08c490e64	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	d8b81d23-4ca8-4240-8261-b43b907160b2	headline	2026-05-05 23:57:36.224-07
71fbb16d-0875-478b-b9fa-b4cc160345cd	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	404ac6db-b2fc-43b8-95ad-7436451675dc	headline	2026-05-05 23:57:36.224-07
55561ba4-a60f-4a73-9532-5d0a09f2fbb1	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	e72072dd-1024-4306-a671-7936c22589a7	headline	2026-05-05 23:57:36.224-07
0ee041af-a622-47bd-99ec-540f0ac8c8e9	c9f69b86-b02f-4e0a-9c42-9520683613aa	2f361f67-0df0-48cb-9abd-ccb0d1d2c112	headline	2026-05-05 23:58:44.395-07
75b3c9b1-ba64-43b1-a98a-8d70ea2e218c	c9f69b86-b02f-4e0a-9c42-9520683613aa	aa3de1dc-1fed-45d2-9c4d-f2c5d720c1c9	headline	2026-05-05 23:58:44.395-07
1b0006bd-b64b-4d06-aab5-e4dc2e916310	c9f69b86-b02f-4e0a-9c42-9520683613aa	b1f0f275-2d70-40be-8058-bf042e0dce71	headline	2026-05-05 23:58:44.395-07
50d94e8f-46bc-4e36-8fa9-0e680e126345	c9f69b86-b02f-4e0a-9c42-9520683613aa	0c5d4592-4f0d-4d39-89d4-df1191b7a686	headline	2026-05-05 23:58:44.395-07
407c3bc1-ce5c-4d31-94b6-8b75d523fae4	c9f69b86-b02f-4e0a-9c42-9520683613aa	da265c30-bbba-4295-9210-4178647a231b	headline	2026-05-05 23:58:44.395-07
993f17cc-4f65-4656-9ab1-9c28417874d1	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	3f0839c6-8870-4825-b16d-0abb7374f1df	headline	2026-05-06 00:24:26.093-07
b2ad932a-0032-41e6-8582-ef5613c428f3	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	5028c83b-3d00-4256-98cb-ee8ac98b5a01	headline	2026-05-06 00:24:26.093-07
10a8a927-eb51-472d-9f15-bf2b8de3fab9	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	4bd767e5-b064-473d-8516-d29675c528d2	headline	2026-05-06 00:24:26.093-07
44eeb962-67ea-4ee4-91a9-7b5657483e80	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	863c82dc-5406-4a4a-83da-305c0537a65b	headline	2026-05-06 00:24:26.093-07
89e9a34e-d1d0-4584-acf4-dfbd5fb39f90	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	48ce37d2-bc37-44d6-91c1-462720a75e99	headline	2026-05-06 00:24:26.093-07
\.


--
-- Data for Name: news_feedbacks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_feedbacks (news_feedback_id, news_id, fullname, thought, created_at, is_published) FROM stdin;
\.


--
-- Data for Name: news_metadata; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_metadata (news_metadata_id, news_id, like_count, dislike_count, read_count, average_read_time, created_at, updated_at) FROM stdin;
b27d1dea-14d9-4104-bab4-77d40a8759c9	c9f69b86-b02f-4e0a-9c42-9520683613aa	1	0	1	0	2026-05-05 23:44:54.862-07	2026-05-05 23:44:54.862-07
4acc6d85-3b28-42b6-880c-ac10b3c81b5d	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	1	0	1	0	2026-05-05 23:54:34.244-07	2026-05-05 23:54:34.244-07
9d88ead3-9049-461a-bcfa-a882f7ac21da	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	0	0	1	0	2026-05-06 00:04:51.31-07	2026-05-06 00:04:51.31-07
da80a5e1-ae4e-4b16-825d-0ccd798d13db	3d973a7d-6922-48df-9845-521a91d3e4fc	0	0	0	0	2026-06-07 23:21:29.535-07	2026-06-07 23:21:29.535-07
\.


--
-- Data for Name: news_reactions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_reactions (news_reaction_id, news_id, ip_address, reaction, created_at) FROM stdin;
aaf83405-2a3f-4aac-9118-016abe356da9	c9f69b86-b02f-4e0a-9c42-9520683613aa	::ffff:172.18.0.6	like	2026-05-05 23:45:57.881-07
400c9a67-592a-493e-b411-40cc3341cea8	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	::ffff:172.18.0.6	like	2026-05-05 23:55:00.816-07
\.


--
-- Data for Name: news_reads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_reads (news_read_id, news_id, ip_address, total_read_time, last_read_at) FROM stdin;
44579dbb-9eb5-4957-9f78-cac82a81724b	c9f69b86-b02f-4e0a-9c42-9520683613aa	::ffff:172.18.0.6	170	2026-06-18 15:27:51.879-07
e7a5b03f-f400-4879-8cd3-61f3643c8414	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	::ffff:172.18.0.6	770	2026-06-23 23:23:14.048-07
3d577cee-2159-49e1-95a0-3db2d5d6ec0c	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	::ffff:172.18.0.6	580	2026-06-24 00:54:08.617-07
\.


--
-- Data for Name: news_tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.news_tags (news_tag_id, news_id, tag_id, created_at) FROM stdin;
b6ad2648-50d0-45f8-8e47-53f50a0f54cc	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	265ec3a0-5c35-44f8-8f70-75802937a4a5	2026-05-05 23:57:36.226-07
b02b163a-ec9a-4a14-b24b-0205b5be827b	2c2acb5c-2f57-4b8d-adbc-420ceac18a1c	664985fa-a6a7-4c32-b2e7-3f03ac47300b	2026-05-05 23:57:36.226-07
16f229c5-09dd-480d-9986-b13055861569	c9f69b86-b02f-4e0a-9c42-9520683613aa	48927f9e-e3ea-4e6f-a6af-ac49fe231143	2026-05-05 23:58:44.398-07
747727fa-8e61-46cb-b546-3c80008a3650	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	664985fa-a6a7-4c32-b2e7-3f03ac47300b	2026-05-06 00:24:26.096-07
f51006cd-db4d-4680-985b-6ab095ff734b	760a8bee-5c9e-4ff0-ab49-235ca84ef3a6	0bb19d7b-5369-4aa1-ad8c-05b465083b9a	2026-05-06 00:24:26.096-07
13188e97-880b-4b26-b5a0-5b4b2e5e1e89	3d973a7d-6922-48df-9845-521a91d3e4fc	0bb19d7b-5369-4aa1-ad8c-05b465083b9a	2026-06-07 23:21:29.532-07
07317e83-0f84-4d19-855d-6f23450e5c57	3d973a7d-6922-48df-9845-521a91d3e4fc	664985fa-a6a7-4c32-b2e7-3f03ac47300b	2026-06-07 23:21:29.532-07
93f71f11-8ce9-4e77-b708-cfb5c8813b8c	3d973a7d-6922-48df-9845-521a91d3e4fc	265ec3a0-5c35-44f8-8f70-75802937a4a5	2026-06-07 23:21:29.532-07
\.


--
-- Data for Name: objectives; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.objectives (objective_id, asm_id, type, icon, title, description, content, foot_note, created_at, updated_at, deleted_at) FROM stdin;
3e9d5bc8-cd35-45af-957d-2caff6d90537	9a531821-f822-4f20-a51f-2cf42f92a50b	headlines	Activity	Developing the ASM sector		Artisanal and small-scale mining (ASM) is widely practiced across Ethiopia and remains vital to livelihoods and the economy, though much of it is still informal. The Government, through the Homegrown Reform Agenda and the Ministry of Mines and Petroleum, is prioritizing ASM formalization and modernization. Ongoing reforms aim to create a safe, regulated, and sustainable sector that boosts economic contribution, increases jobs and revenue, and strengthens investment in Ethiopia’s mining industry.	\N	2026-05-04 02:02:41.263-07	2026-05-04 02:02:41.263-07	\N
f5eafc6b-7b69-44af-9faa-a853103514f7	9a531821-f822-4f20-a51f-2cf42f92a50b	strategic_objective	\N	The strategy aims to transform ASM	Formalize and modernize Ethiopia’s ASM sector for sustainable development and inclusive economic growth	\N	\N	2026-05-04 02:02:41.264-07	2026-05-04 02:02:41.264-07	\N
71742fc3-9b9a-4917-be06-3e96b504412e	9a531821-f822-4f20-a51f-2cf42f92a50b	economic_impact	ChartColumnIncreasing	Economic and Social Impact of ASM in Ethiopia	\N	\N	ASM is a key driver of rural livelihoods and national foreign exchange earnings.	2026-05-04 02:02:41.266-07	2026-05-04 02:02:41.266-07	\N
71420853-b6bc-4059-affe-9910110f3623	9a531821-f822-4f20-a51f-2cf42f92a50b	impact_contribution	\N	74%	Rural Stability	\N	\N	2026-05-04 02:02:41.267-07	2026-05-04 02:02:41.267-07	\N
6b9b8b5d-16a5-4a0c-96eb-93a4dc2a1c41	9a531821-f822-4f20-a51f-2cf42f92a50b	impact_contribution	\N	1.26M	Direct Jobs	\N	\N	2026-05-04 02:02:41.267-07	2026-05-04 02:02:41.267-07	\N
77187fa6-f8bb-4093-beec-697182dc53f8	9a531821-f822-4f20-a51f-2cf42f92a50b	impact_contribution	\N	65%	Foreign Exchange Contribution	\N	\N	2026-05-04 02:02:41.267-07	2026-05-04 02:02:41.267-07	\N
4101b68a-8655-4527-b160-1451d0668c2c	9a531821-f822-4f20-a51f-2cf42f92a50b	strategic_pillars	FactoryIcon	Value Addition & Markets	Enhancing processing capacity and market access for higher earnings	\N	\N	2026-05-04 02:02:41.269-07	2026-05-04 02:02:41.269-07	\N
e54858af-31af-402a-8722-be8c33ed45b4	9a531821-f822-4f20-a51f-2cf42f92a50b	strategic_pillars	LucideLightbulb	Productivity & Efficiency	Improving access to capital, technology, and skilled labor	\N	\N	2026-05-04 02:02:41.269-07	2026-05-04 02:02:41.269-07	\N
aa3cdd4c-75cb-4c50-bc54-42b32603390c	9a531821-f822-4f20-a51f-2cf42f92a50b	strategic_pillars	ScaleIcon	Governance & Regulation	Strengthening legal frameworks, institutional structures, and data systems	\N	\N	2026-05-04 02:02:41.269-07	2026-05-04 02:02:41.269-07	\N
14ebabc8-401b-49a7-a46c-4a62a78d794a	9a531821-f822-4f20-a51f-2cf42f92a50b	strategic_pillars	LucideLeaf	Environmental & Social Responsibility	Ensuring safe, sustainable, and responsible mining practices	\N	\N	2026-05-04 02:02:41.269-07	2026-05-04 02:02:41.269-07	\N
37c3d73b-ecc8-408a-b4eb-1db580e98e1a	9a531821-f822-4f20-a51f-2cf42f92a50b	key_initiatives	\N	Formalization of ASM Sector	Transition miners into legal and regulated operations	\N	\N	2026-05-04 02:02:41.271-07	2026-05-04 02:02:41.271-07	\N
5d505b61-6c32-4c60-a3bc-e511f9763d52	9a531821-f822-4f20-a51f-2cf42f92a50b	objectives	\N	Increase National Revenue	Improve royalty collection and export earnings	\N	\N	2026-05-04 02:02:41.272-07	2026-05-04 02:02:41.272-07	\N
9d55f2ce-f1b4-4e7f-b965-68218eaa333c	9a531821-f822-4f20-a51f-2cf42f92a50b	objectives	FileDiffIcon	Legal Integration of Miners	Bring informal miners into the formal economy	\N	\N	2026-05-04 02:02:41.272-07	2026-05-04 02:02:41.272-07	\N
\.


--
-- Data for Name: partner_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partner_attachments (partner_attachment_id, category, partner_id, attachment_id, created_at) FROM stdin;
a7e19dea-cc6b-4874-89c0-6d8b732acb03	logo	a37c20a1-d03a-4834-ab05-5fc92cf81322	a293e86e-5588-408f-9d86-19ff9b5b59f1	2026-05-04 01:32:11.509-07
de908c99-a93b-4e88-afe8-4d3195f181bc	logo	a37c20a1-d03a-4834-ab05-5fc92cf81322	b11e85c1-3f80-467a-b2dc-706420e46820	2026-05-04 01:32:11.51-07
\.


--
-- Data for Name: partners; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.partners (partner_id, title, description, created_at, updated_at, deleted_at) FROM stdin;
a37c20a1-d03a-4834-ab05-5fc92cf81322	Our Partners	Partners in Ethiopia’s Mining Sector	2026-04-28 22:58:22.473-07	2026-05-04 01:32:11.504-07	\N
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.permissions (permission_id, resource, action, is_active, created_at, updated_at) FROM stdin;
92e08ef9-f220-4b60-9d0c-d8f55b262674	dashboard	view	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
dce232d1-cb9f-4372-94cc-113afe6dd1ee	users	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
7b1b0288-23e4-41b8-bcc8-5ae87467f60c	users	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
6f8ad2ac-1897-4c1b-a209-741a41780474	users	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
0406e550-416c-42d8-a484-0df0160aa824	users	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
3c13ecd4-da25-4ae0-a59f-9ba5c93645a7	users	assign_role	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
9ebce3a4-8351-4447-b2cd-ab459a6e6b89	roles	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
759b2449-6ce1-4ad5-b9ed-c567c442816f	roles	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
bf8269c3-1f8e-4663-98d4-e830e15ffe6a	roles	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
a6adc336-1a81-43da-8a79-92344f46dc41	roles	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
ae2e55d8-827e-414c-b927-e90183f1bbe4	roles	assign_permission	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
243d4c7b-7e43-4842-b65c-8193f775b761	permissions	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
15df2df5-25d0-45b7-a643-36f221a337dc	permissions	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
cd4cc694-72f9-4b24-9b3b-343b983e9102	permissions	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
5984a789-633d-48c0-b871-0d9794b8b6af	permissions	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
a8682296-9f24-4454-a69f-f31dfbbd7578	news	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e14c3030-efed-4453-ac26-8fd93189b649	news	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
f028eb67-d8ea-4947-bcf9-c15f5a68ddd7	news	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
b2100f46-64e5-4032-9ef8-3dd1248fd052	news	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
1766eed8-5aab-4938-a4ac-22b962d7bbf6	news	publish	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
305d146d-06e4-43d8-842f-e2d1aea6f194	events	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
8c7b137f-51f7-4080-9504-8d484b4922e3	events	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
cbe3b46f-7ed3-424e-ba0c-92d74a75468b	events	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
17ba43d5-f8ff-4163-837e-eff34a4433b4	events	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
480d8ec0-f4a9-44fc-b2b8-eb3a37498729	events	publish	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e6d66b47-b839-4ab9-b4b6-7b1a39d8d12a	event_categories	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
a99a9d45-3d1d-44a6-9ef7-e01716724a29	event_categories	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
6c44d09f-b45a-4bcb-a491-2088978eeb03	event_categories	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
955514fc-a88b-4e50-8f88-dad6fe900371	event_categories	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
d1aff3b4-9805-4449-b94f-154df5e1f405	tags	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e5d15025-1742-4cf4-adbc-bfd0bfcbc1b9	tags	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
930d5088-6cb9-428f-990d-403117f367e3	tags	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
78e4fca9-3629-4df1-9e1e-63001c8fafe7	tags	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
1aed056c-6bcb-4005-b50c-fc27542b5d67	hero	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
3b62ef70-ceb2-4fba-9608-84f3ff3eae90	hero	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
c9d697b1-b1fe-4752-af4b-bf9f7874ca64	hero	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
f0833e67-162b-40c1-a606-8959aeefee46	hero	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
acca43df-4b1e-4ccb-aa20-5515b22320b8	about	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
063e9305-2cb9-48bb-a2e0-a57bde0f0eac	about	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
5710de96-01ad-4940-9583-e888ff6acd26	about	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
16680a80-7590-4934-a8ed-59e7d00a8b61	contact	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
f0a4a42a-8746-4a9c-81ae-a30187ad6bef	contact	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
2698d6ec-b8ee-4740-a75d-03378c6f8366	contact	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
9c2e02f2-835c-478a-b7d5-8058284e5ce9	contact	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
465e9f25-ecf1-45cd-92cf-f5ce6264c00b	contact_messages	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
99d88773-dfae-4685-a346-bcde3299ec69	contact_messages	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4b1a9ead-c4ed-4b5c-baae-80bdd908bc6f	contact_messages	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
17012db3-50d1-44da-9ec4-f22072df0cd1	footer	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
380a2a53-8138-4a16-a099-f67ddeb079fe	footer	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
04ea74fc-2fdd-42e6-af6d-61ccada6c5a3	footer	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
b66b3d69-7425-4dff-9321-47abd1bfe462	footer	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
9740abc8-fb14-4d8e-b658-5a4f28bf15cc	investigate_ethiopia	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
632cd643-3c74-4d6a-8cea-5ea3372126e0	investigate_ethiopia	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
df7704d3-2002-4c93-8f37-b702f8c96820	investigate_ethiopia	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
6ff0b64b-869a-407e-900a-7eca8e22c052	investigate_ethiopia	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
6e93e036-6d07-486c-b08d-057694ada853	services	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
7ab44246-c5f8-45b0-9a7f-b75c9f72b324	services	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4f0d8f1c-66b5-45df-a135-b2d22dd16677	services	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4b6d922e-27f0-4ad9-8b7d-aa68dd5beb70	services	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
75d5d1bf-3dff-4be0-bfba-863dc49a3bca	asm	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
8f33667b-19dd-4149-ba90-5b80421ffe94	asm	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
1957760f-4283-4167-9b38-b2a41c17be7e	asm	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
877505bc-94fd-4c32-b854-0ea3a67c99f6	asm	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e41ef1c5-c29d-4ccb-99e7-1799bddb8ae8	mining_snapshots	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
5cb041ab-9faf-42b3-932e-669d6a474766	mining_snapshots	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
0e3618e7-bc87-4c80-a747-7aafa91c5ed1	mining_snapshots	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
150fb1e8-1933-4a92-8a60-6e236052824e	mining_snapshots	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
121d70d2-8f43-4aa1-b337-a26fee10392a	mining_gamestones	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
0ce94bc7-1316-4b6a-a559-c0cad0dc0e11	mining_gamestones	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
08619aed-be77-46ad-bf5b-caae6b9a5e73	mining_gamestones	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
c3b46cd5-2a73-444c-8303-063d4588d5a6	mining_gamestones	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4374e139-b714-493d-8172-7e21fd71493e	mining_resources	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
43d950e4-528c-4ae7-a5ee-307c48934efa	mining_resources	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
936aff02-e9da-41ed-bbf5-5bf6cabf7976	mining_resources	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
d6ce7744-8f2d-4734-b83d-43f3ca8d0adf	mining_resources	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
09b437c4-b046-471c-a800-753f8d6cc10a	mining_application_processes	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
1ab033fe-02d9-4a04-886e-1a5f3791e3ef	mining_application_processes	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
dd6fa657-b7d5-4663-99ed-ebf5efe4d25f	mining_application_processes	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
430d3661-1189-4450-9159-f038a58692ee	mining_application_processes	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
bf93a76c-68dd-43e9-ad08-158a90e19fab	mining_regulation_processes	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
685af1d5-fc90-4918-bf07-73bc657f6d11	mining_regulation_processes	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
7763aea5-0a6c-4ac5-b67c-9252765faaad	mining_regulation_processes	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
6248e12d-e24a-4813-b163-f5e4dba343d1	mining_regulation_processes	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
30999797-143d-401a-983b-55a898f77a4e	geothermal_snapshots	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
2a7da951-f8b5-44a1-9f56-a282ffba2364	geothermal_snapshots	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
be27b1fb-c9c3-4709-913e-b290c765278a	geothermal_snapshots	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
77d2afcb-02ab-47bd-8065-9b647406b609	geothermal_snapshots	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
d0c28d0d-640b-4dfb-a93a-9d05f32d096b	geothermal_resources	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
2e269344-bed3-4d39-8c30-730c12d3e016	geothermal_resources	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
31775c98-aede-46cd-8bc5-90188bb02cc7	geothermal_resources	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
3e4bfe92-c9d9-4868-8440-496fb60a41db	geothermal_resources	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
3a0c13db-f27a-4dcd-81e6-dc242359ca63	petroleum_snapshots	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
17d6fb52-90b9-45d2-94a6-ad6a0fc0f515	petroleum_snapshots	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
1fc4ec5b-5acc-45db-9990-68d288dbe516	petroleum_snapshots	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
80191ffc-91a9-45c8-9c5f-aa3617a61ccf	petroleum_snapshots	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
eca94543-ad28-44ce-81e3-f9a0583237ac	about	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e17da225-a70f-497c-bda8-563789b43b6e	petroleum_resources	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4d96321b-23bd-4738-8e46-d7541970824c	petroleum_resources	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e4e52096-1558-4cc1-aa0f-49d265e2a1e2	petroleum_resources	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
873e3d52-891c-47a7-9ecf-3cbf2a011703	petroleum_resources	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
b251166b-9815-4f70-92da-2e610d6feed5	petroleum_processes	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
8f7589ff-9623-4f2e-8cc7-8827674623fb	petroleum_processes	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
7aa3c66c-4c20-4203-83e7-ee73b8a6b6bc	petroleum_processes	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
891ce220-f3b0-4e8e-9375-94be4a94cd25	petroleum_processes	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
556fca59-b460-490a-850e-815f800a53ab	petroleum_processes	publish	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
42dbbbd8-2af6-47cd-b00b-8c275efb5078	petroleum_regulation_processes	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4a5d2536-828f-42f1-82c3-462f4d88eb7b	petroleum_regulation_processes	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
52fd94d7-59af-4721-afe1-38d87609310c	petroleum_regulation_processes	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
bd1c0612-beab-4412-abac-df006ce954f5	petroleum_regulation_processes	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
e7529ed5-d859-4c3c-96f9-f808c2aaaa7a	attachments	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
dfc36124-7f91-48d0-9064-9982937b020b	attachments	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
77b384fc-a536-4720-b2f0-9b2c88be7643	attachments	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
7655b4c3-b1d2-46e8-b9b4-2a22dce6d7c4	audit_logs	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
174e0fd0-9df9-455d-85d3-b0c64a332c7e	audit_logs	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
600bb424-23f6-49e5-867a-1b68bb867487	routes	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
4fae1b8e-f752-4cdd-8edd-0e80b28d5920	routes	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
45d27ef5-9738-4221-a9a8-3a2774a54af8	navigation	create	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
7f9c8fa6-dff5-4c8e-b7ad-3c085e605db6	navigation	read	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
c5cfd039-3e48-42e1-bd1d-08d0b1bc91d5	navigation	update	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
67188efe-b2bf-4e9d-bb66-f130743e4e88	navigation	delete	t	2026-04-28 06:48:34.871-07	2026-04-28 06:48:34.871-07
f3da9516-35b6-401a-8e13-55395fad5ffb	opportunities	create	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
420c44de-30c1-44f8-a9fd-add847921f04	opportunities	read	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
f869771d-6515-4a77-82e8-4f07a8a54166	opportunities	update	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
547f4d14-6e20-4649-add1-2995135651ad	opportunities	delete	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
728b37bb-0034-4495-86c9-d649066a37bf	opportunities	publish	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
56f644d5-18c1-48b8-a1d7-31d78261985f	tenders	create	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
23c6c073-9147-46bd-a338-f8dd936cc45e	tenders	read	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
f4d8f3a1-9ae3-4d02-bbf8-69d458ca61f8	tenders	update	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
d0344a54-a1d1-45b5-b378-012b9e652907	tenders	delete	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
1ce78f96-c9d9-4dda-8eb6-3a5dd2730b44	tenders	publish	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
6013013e-161c-4327-89a8-80f17e963550	vacancies	create	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
2688af1d-030e-4246-8a39-b3dc880434d5	vacancies	read	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
4fbff47c-292c-464b-b6d6-38f2e29073a1	vacancies	update	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
0e90aa11-9c5f-4655-94ef-213d8761b3d7	vacancies	delete	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
355ca053-fb1b-44d4-8375-53b5b51d6b5d	vacancies	publish	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
\.


--
-- Data for Name: petroleum_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_attachments (petroleum_attachment_id, label, petroleum_objective_id, attachment_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: petroleum_directive; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_directive (petroleum_directive_id, petroleum_regulation_process_id, "order", title, description, type, action_label, action, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: petroleum_objective; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_objective (petroleum_objective_id, type, title, description, content, objectives, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: petroleum_processes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_processes (petroleum_process_id, title, description, published, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: petroleum_regulation; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_regulation (petroleum_regulation_id, petroleum_regulation_process_id, "order", title, description, content, objectives, bullet_points, steps, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: petroleum_regulation_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_regulation_attachments (petroleum_regulation_attachment_id, petroleum_regulation_process_id, attachment_id, label, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: petroleum_regulation_process; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.petroleum_regulation_process (petroleum_regulation_process_id, published, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: process_block_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.process_block_attachments (process_block_attachment_id, label, process_block_id, attachment_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: process_blocks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.process_blocks (process_block_id, petroleum_process_id, title, description, content, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: process_steps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.process_steps (process_step_id, petroleum_process_id, title, description, content, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: regional_office_contact_centers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.regional_office_contact_centers (regional_office_id, region_id, bureau_name, address, director, email, phone, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: regions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.regions (region_id, code, name, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: resource; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.resource (resource_id, sector, title, description, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: resource_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.resource_attachments (resource_attachment_id, resource_id, attachment_id, label, created_at) FROM stdin;
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.role_permissions (role_permission_id, role_id, permission_id, is_active, created_at, updated_at) FROM stdin;
364a4749-909a-4ee0-b5b3-f3040f48614d	00000000-0000-4000-8000-000000000002	92e08ef9-f220-4b60-9d0c-d8f55b262674	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
2af50b13-8fe8-41b4-bc6a-a925a1e3fea8	00000000-0000-4000-8000-000000000002	dce232d1-cb9f-4372-94cc-113afe6dd1ee	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0e6018e9-74af-4e3c-9c5a-cc0231816b43	00000000-0000-4000-8000-000000000002	7b1b0288-23e4-41b8-bcc8-5ae87467f60c	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a1bde4b7-fc21-4ad3-a89f-636e4797cf33	00000000-0000-4000-8000-000000000002	6f8ad2ac-1897-4c1b-a209-741a41780474	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
db3d327e-ed91-45b4-a742-0e82637642af	00000000-0000-4000-8000-000000000002	0406e550-416c-42d8-a484-0df0160aa824	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
5758a91a-bd72-4fef-aed5-c3c4c191d1c0	00000000-0000-4000-8000-000000000002	3c13ecd4-da25-4ae0-a59f-9ba5c93645a7	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
5a8ec15b-d191-4677-b04f-6476994c0b08	00000000-0000-4000-8000-000000000002	9ebce3a4-8351-4447-b2cd-ab459a6e6b89	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0714db07-9e22-4ea3-8d4a-063975c8a915	00000000-0000-4000-8000-000000000002	759b2449-6ce1-4ad5-b9ed-c567c442816f	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0ac3cfb6-5124-46b0-8afd-c0d32ffb1b69	00000000-0000-4000-8000-000000000002	bf8269c3-1f8e-4663-98d4-e830e15ffe6a	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
bc0b1a7f-2b92-48e7-9e38-6cd7e9954236	00000000-0000-4000-8000-000000000002	a6adc336-1a81-43da-8a79-92344f46dc41	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
5a9c256f-dc48-4ef1-900c-a6c84eda970a	00000000-0000-4000-8000-000000000002	ae2e55d8-827e-414c-b927-e90183f1bbe4	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
40f2e7f5-6bf1-487d-8dfe-97ba76fe7f77	00000000-0000-4000-8000-000000000002	243d4c7b-7e43-4842-b65c-8193f775b761	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
9cfc5a14-fd8e-47aa-b0e2-624dca1ce217	00000000-0000-4000-8000-000000000002	15df2df5-25d0-45b7-a643-36f221a337dc	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
f464948e-a1fa-40ac-8f7d-1580582abe71	00000000-0000-4000-8000-000000000002	cd4cc694-72f9-4b24-9b3b-343b983e9102	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a3080bb1-19e1-4ee7-b3fd-674ccb3e21f2	00000000-0000-4000-8000-000000000002	5984a789-633d-48c0-b871-0d9794b8b6af	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
b167c3c5-3ec3-4fba-ac2d-82c3f2f52d51	00000000-0000-4000-8000-000000000002	a8682296-9f24-4454-a69f-f31dfbbd7578	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
e0328322-bc66-4f40-b754-3b996a833bd3	00000000-0000-4000-8000-000000000002	e14c3030-efed-4453-ac26-8fd93189b649	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
34fc2a2f-c512-43d0-8594-d815ee6fda98	00000000-0000-4000-8000-000000000002	f028eb67-d8ea-4947-bcf9-c15f5a68ddd7	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
366aeec8-880e-403f-b80b-229249be22af	00000000-0000-4000-8000-000000000002	b2100f46-64e5-4032-9ef8-3dd1248fd052	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
d7d9baf7-203e-4dc7-89e9-913e02ca7f45	00000000-0000-4000-8000-000000000002	1766eed8-5aab-4938-a4ac-22b962d7bbf6	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
9a50bda3-eb99-45e3-8efb-ba7bf28dd01a	00000000-0000-4000-8000-000000000002	305d146d-06e4-43d8-842f-e2d1aea6f194	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
36af9a17-026c-42ef-b88a-475d02055080	00000000-0000-4000-8000-000000000002	8c7b137f-51f7-4080-9504-8d484b4922e3	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
9872c44b-bb04-4342-98ff-8e8eed87c19e	00000000-0000-4000-8000-000000000002	cbe3b46f-7ed3-424e-ba0c-92d74a75468b	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
2a06c5e6-1a17-4605-a173-a248bf890f4c	00000000-0000-4000-8000-000000000002	17ba43d5-f8ff-4163-837e-eff34a4433b4	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
4889ea58-f6e7-448d-a70c-a663df7751b4	00000000-0000-4000-8000-000000000002	480d8ec0-f4a9-44fc-b2b8-eb3a37498729	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
7b3bacf7-213b-4c43-b12e-e6ab0beb8da9	00000000-0000-4000-8000-000000000002	e6d66b47-b839-4ab9-b4b6-7b1a39d8d12a	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
6d614c34-e63d-424c-99f4-e85b909953af	00000000-0000-4000-8000-000000000002	a99a9d45-3d1d-44a6-9ef7-e01716724a29	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
8d84fed5-2bf8-4d11-942d-21293a42628e	00000000-0000-4000-8000-000000000002	6c44d09f-b45a-4bcb-a491-2088978eeb03	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
241b5772-3205-4032-9cbd-11d0bc511ce4	00000000-0000-4000-8000-000000000002	955514fc-a88b-4e50-8f88-dad6fe900371	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
c3a95a38-fd25-438b-9c36-3c0749c16c16	00000000-0000-4000-8000-000000000002	d1aff3b4-9805-4449-b94f-154df5e1f405	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
c5a090b3-f354-411a-a738-466ae692ca23	00000000-0000-4000-8000-000000000002	e5d15025-1742-4cf4-adbc-bfd0bfcbc1b9	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0b4d6a35-1202-453c-8fe6-b239f3b164db	00000000-0000-4000-8000-000000000002	930d5088-6cb9-428f-990d-403117f367e3	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
1e55d3d6-d4fb-468a-82e7-7d1c2c1e6be3	00000000-0000-4000-8000-000000000002	78e4fca9-3629-4df1-9e1e-63001c8fafe7	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a7416411-b083-4460-8cb2-5e8d08f9b5bf	00000000-0000-4000-8000-000000000002	1aed056c-6bcb-4005-b50c-fc27542b5d67	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0674d5b9-67a6-4032-8e78-8722c61f3817	00000000-0000-4000-8000-000000000002	3b62ef70-ceb2-4fba-9608-84f3ff3eae90	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
91741e0d-b4c0-44b2-b73e-0016f58ae2c0	00000000-0000-4000-8000-000000000002	c9d697b1-b1fe-4752-af4b-bf9f7874ca64	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
3c01172e-54d2-4a79-abf2-de5855739581	00000000-0000-4000-8000-000000000002	f0833e67-162b-40c1-a606-8959aeefee46	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
d8dbcfa6-bd57-4b4b-bed0-69bafe58daac	00000000-0000-4000-8000-000000000002	eca94543-ad28-44ce-81e3-f9a0583237ac	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0534e719-3104-45be-97f0-e17abf6fbe29	00000000-0000-4000-8000-000000000002	acca43df-4b1e-4ccb-aa20-5515b22320b8	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
579afc17-3aee-4e2a-8a1a-7be41d4c072a	00000000-0000-4000-8000-000000000002	063e9305-2cb9-48bb-a2e0-a57bde0f0eac	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
5edb72fb-57d8-486d-8d65-579d229fbf4f	00000000-0000-4000-8000-000000000002	5710de96-01ad-4940-9583-e888ff6acd26	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
343a6645-5cf1-4f48-899f-782b1ebdf2db	00000000-0000-4000-8000-000000000002	16680a80-7590-4934-a8ed-59e7d00a8b61	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
d6c7f2e5-1c87-4b51-8e71-b7350595bd26	00000000-0000-4000-8000-000000000002	f0a4a42a-8746-4a9c-81ae-a30187ad6bef	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
bb2fd5e2-6df6-40bb-a6c5-4294060512fd	00000000-0000-4000-8000-000000000002	2698d6ec-b8ee-4740-a75d-03378c6f8366	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
235f90ac-32be-49e6-b158-dd6e565cf567	00000000-0000-4000-8000-000000000002	9c2e02f2-835c-478a-b7d5-8058284e5ce9	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
7fda5c64-11f4-4af8-bbf3-710e8cf2d0ea	00000000-0000-4000-8000-000000000002	465e9f25-ecf1-45cd-92cf-f5ce6264c00b	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
775d305b-7afc-4153-9499-9ef6734c543d	00000000-0000-4000-8000-000000000002	99d88773-dfae-4685-a346-bcde3299ec69	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
535a719c-3592-48a0-bda9-84e5eb7bb45c	00000000-0000-4000-8000-000000000002	4b1a9ead-c4ed-4b5c-baae-80bdd908bc6f	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
7934a07d-4cf1-403c-bc79-e1bd28c4a163	00000000-0000-4000-8000-000000000002	17012db3-50d1-44da-9ec4-f22072df0cd1	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
daf5ca23-19c3-4ec7-9713-6da0cb6521dc	00000000-0000-4000-8000-000000000002	380a2a53-8138-4a16-a099-f67ddeb079fe	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a650dffb-14b5-44dc-a591-279edb71e5fa	00000000-0000-4000-8000-000000000002	04ea74fc-2fdd-42e6-af6d-61ccada6c5a3	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
3ad0acc7-1bf8-48a2-aa9f-b61bad006428	00000000-0000-4000-8000-000000000002	b66b3d69-7425-4dff-9321-47abd1bfe462	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
6cfd03cc-6e46-4345-9568-d72ebee70b1e	00000000-0000-4000-8000-000000000002	9740abc8-fb14-4d8e-b658-5a4f28bf15cc	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
3c6cbaa0-6ca0-48df-a661-dce1703051a4	00000000-0000-4000-8000-000000000002	632cd643-3c74-4d6a-8cea-5ea3372126e0	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
3bf1843d-dc2a-4c08-a2b1-ddd1a478e605	00000000-0000-4000-8000-000000000002	df7704d3-2002-4c93-8f37-b702f8c96820	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
fc2d2cb8-4ad9-4b45-beaf-4456b837bfc8	00000000-0000-4000-8000-000000000002	6ff0b64b-869a-407e-900a-7eca8e22c052	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0a90288e-618e-4ac1-81b8-eb26db164696	00000000-0000-4000-8000-000000000002	6e93e036-6d07-486c-b08d-057694ada853	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
fd90c34a-ba6a-431c-9488-c85174f9f9d1	00000000-0000-4000-8000-000000000002	7ab44246-c5f8-45b0-9a7f-b75c9f72b324	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
79bf5cca-53b8-4a8a-a11e-6ba5ebc42989	00000000-0000-4000-8000-000000000002	4f0d8f1c-66b5-45df-a135-b2d22dd16677	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
dda1d885-325c-46b1-9a10-6782ad48e1a7	00000000-0000-4000-8000-000000000002	4b6d922e-27f0-4ad9-8b7d-aa68dd5beb70	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
00898366-2207-4b56-a4a4-44c8b564d634	00000000-0000-4000-8000-000000000002	75d5d1bf-3dff-4be0-bfba-863dc49a3bca	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
d019380c-811f-4040-a9bf-5f95e7c15e21	00000000-0000-4000-8000-000000000002	8f33667b-19dd-4149-ba90-5b80421ffe94	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
10780b43-3bbd-44e9-b0ba-b2fd74453b2f	00000000-0000-4000-8000-000000000002	1957760f-4283-4167-9b38-b2a41c17be7e	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
9501b512-b06c-458a-ba21-2058e51d8c9d	00000000-0000-4000-8000-000000000002	877505bc-94fd-4c32-b854-0ea3a67c99f6	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
df11c1fd-0a7c-47fa-92f3-cfa0178f90fc	00000000-0000-4000-8000-000000000002	e41ef1c5-c29d-4ccb-99e7-1799bddb8ae8	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
632bd577-6690-4d64-86cc-e2aa637701e8	00000000-0000-4000-8000-000000000002	5cb041ab-9faf-42b3-932e-669d6a474766	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
e5452b5c-f449-40b6-8f44-a1972732bde4	00000000-0000-4000-8000-000000000002	0e3618e7-bc87-4c80-a747-7aafa91c5ed1	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
bdad2363-9cc1-442b-a586-85288add5b14	00000000-0000-4000-8000-000000000002	150fb1e8-1933-4a92-8a60-6e236052824e	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
3412b273-4fce-4c2d-b567-e6a140c0ba09	00000000-0000-4000-8000-000000000002	121d70d2-8f43-4aa1-b337-a26fee10392a	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
2fbbe33e-4337-4f56-bce2-d80bd139aebc	00000000-0000-4000-8000-000000000002	0ce94bc7-1316-4b6a-a559-c0cad0dc0e11	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
03a10fed-a689-4e1d-984e-1ee917a33929	00000000-0000-4000-8000-000000000002	08619aed-be77-46ad-bf5b-caae6b9a5e73	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
be7ad94e-0517-4b83-aba4-9e5b19f6abcd	00000000-0000-4000-8000-000000000002	c3b46cd5-2a73-444c-8303-063d4588d5a6	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
b25c57bb-61c9-476c-ae22-db949cd5385a	00000000-0000-4000-8000-000000000002	4374e139-b714-493d-8172-7e21fd71493e	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
bf029b58-263e-42ca-9ace-72e8f4e542e8	00000000-0000-4000-8000-000000000002	43d950e4-528c-4ae7-a5ee-307c48934efa	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
fd3a0b2f-903d-4bbd-9c8a-816cff2756e4	00000000-0000-4000-8000-000000000002	936aff02-e9da-41ed-bbf5-5bf6cabf7976	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
fc17b8d9-3c61-4022-b340-24002012f1a8	00000000-0000-4000-8000-000000000002	d6ce7744-8f2d-4734-b83d-43f3ca8d0adf	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
5fa45146-311a-46c7-8773-fe10eb66584f	00000000-0000-4000-8000-000000000002	09b437c4-b046-471c-a800-753f8d6cc10a	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
aa6852c5-9f1c-4fad-9602-f1aeffda9c6f	00000000-0000-4000-8000-000000000002	1ab033fe-02d9-4a04-886e-1a5f3791e3ef	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
d311ce56-f8b9-4dba-8127-4eb5d60d3f50	00000000-0000-4000-8000-000000000002	dd6fa657-b7d5-4663-99ed-ebf5efe4d25f	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
8fdad64b-c36c-4e7a-835d-3c382aef5c4b	00000000-0000-4000-8000-000000000002	430d3661-1189-4450-9159-f038a58692ee	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
9b016b74-ec3e-4ca8-9088-1a330ebde5ab	00000000-0000-4000-8000-000000000002	bf93a76c-68dd-43e9-ad08-158a90e19fab	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
8cc953a0-8cdf-4a4a-ab26-946fa00c7627	00000000-0000-4000-8000-000000000002	685af1d5-fc90-4918-bf07-73bc657f6d11	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
dd49e745-191b-4d3c-a2ad-fc45a13838ab	00000000-0000-4000-8000-000000000002	7763aea5-0a6c-4ac5-b67c-9252765faaad	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a75e2850-78ad-4139-a9af-2a59a9739cfe	00000000-0000-4000-8000-000000000002	6248e12d-e24a-4813-b163-f5e4dba343d1	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
1123ca2e-a5cd-4dbb-9db9-4df2515a263e	00000000-0000-4000-8000-000000000002	30999797-143d-401a-983b-55a898f77a4e	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
936afd1f-5050-48fe-83ed-0e9f0b610858	00000000-0000-4000-8000-000000000002	2a7da951-f8b5-44a1-9f56-a282ffba2364	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
4a3055ec-da89-46b9-96f6-0abf7395f513	00000000-0000-4000-8000-000000000002	be27b1fb-c9c3-4709-913e-b290c765278a	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
811ff8bb-775a-4125-9d73-297834753918	00000000-0000-4000-8000-000000000002	77d2afcb-02ab-47bd-8065-9b647406b609	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
3e49ba6d-f88e-42ca-a3db-d2e3764700d4	00000000-0000-4000-8000-000000000002	d0c28d0d-640b-4dfb-a93a-9d05f32d096b	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
055c36ee-2196-4298-8d25-86d11439f2b4	00000000-0000-4000-8000-000000000002	2e269344-bed3-4d39-8c30-730c12d3e016	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
19215a8d-363b-4adc-ade7-516b96f484e3	00000000-0000-4000-8000-000000000002	31775c98-aede-46cd-8bc5-90188bb02cc7	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
112bc05d-f3f2-4500-a0c3-797f092ac39e	00000000-0000-4000-8000-000000000002	3e4bfe92-c9d9-4868-8440-496fb60a41db	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
86717e96-4c44-440c-b453-f244fedc1328	00000000-0000-4000-8000-000000000002	3a0c13db-f27a-4dcd-81e6-dc242359ca63	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0cd48ee0-d286-44d6-b80a-c7893b31237e	00000000-0000-4000-8000-000000000002	17d6fb52-90b9-45d2-94a6-ad6a0fc0f515	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
ca5b1717-fb86-40f4-977c-7aa5e0ed5b13	00000000-0000-4000-8000-000000000002	1fc4ec5b-5acc-45db-9990-68d288dbe516	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
9c03903c-e79e-442a-b0f1-3fecf88f3d3e	00000000-0000-4000-8000-000000000002	80191ffc-91a9-45c8-9c5f-aa3617a61ccf	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
6ae8fdef-4f2f-4a3b-9446-7ca851eb9fd7	00000000-0000-4000-8000-000000000002	e17da225-a70f-497c-bda8-563789b43b6e	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
ad6649cc-810a-4dc5-bc19-1ea4314b9439	00000000-0000-4000-8000-000000000002	4d96321b-23bd-4738-8e46-d7541970824c	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
8128fc8d-4f3f-4098-a284-0ed1a0b1da8f	00000000-0000-4000-8000-000000000002	e4e52096-1558-4cc1-aa0f-49d265e2a1e2	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
7ba0db41-3ab6-4dab-8a21-7809e33317a5	00000000-0000-4000-8000-000000000002	873e3d52-891c-47a7-9ecf-3cbf2a011703	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
075df376-4e31-4fea-bda3-ff89e4bf298c	00000000-0000-4000-8000-000000000002	b251166b-9815-4f70-92da-2e610d6feed5	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
31b9dcda-e1c8-4c03-aa73-1ebd1b67200e	00000000-0000-4000-8000-000000000002	8f7589ff-9623-4f2e-8cc7-8827674623fb	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
f699c231-a0cf-4833-8060-ddacddbf0af6	00000000-0000-4000-8000-000000000002	7aa3c66c-4c20-4203-83e7-ee73b8a6b6bc	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
27047da5-68b8-483f-9852-df769375f893	00000000-0000-4000-8000-000000000002	891ce220-f3b0-4e8e-9375-94be4a94cd25	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
d7ffa82b-0608-4d7d-9fe2-4ae6e17efc69	00000000-0000-4000-8000-000000000002	556fca59-b460-490a-850e-815f800a53ab	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
de99e190-482c-4acb-80b3-18d9f6db6098	00000000-0000-4000-8000-000000000002	42dbbbd8-2af6-47cd-b00b-8c275efb5078	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
1780c69d-d451-443b-97c8-00e892a9370d	00000000-0000-4000-8000-000000000002	4a5d2536-828f-42f1-82c3-462f4d88eb7b	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
25254035-c4cf-473b-a238-2c6fe9cc9be3	00000000-0000-4000-8000-000000000002	52fd94d7-59af-4721-afe1-38d87609310c	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
1f999d1c-6d16-4ff1-b843-6f2ccc2badcf	00000000-0000-4000-8000-000000000002	bd1c0612-beab-4412-abac-df006ce954f5	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
60a5993b-77d9-4631-80a0-959278235a72	00000000-0000-4000-8000-000000000002	e7529ed5-d859-4c3c-96f9-f808c2aaaa7a	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
0f1e5398-e53b-41f3-99cf-98a2ce185ae9	00000000-0000-4000-8000-000000000002	dfc36124-7f91-48d0-9064-9982937b020b	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
655582ab-ee50-4c84-8e46-3e3b744d81e4	00000000-0000-4000-8000-000000000002	77b384fc-a536-4720-b2f0-9b2c88be7643	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
aa0f4fde-9fe4-4ec8-a7a2-07af11664cc3	00000000-0000-4000-8000-000000000002	7655b4c3-b1d2-46e8-b9b4-2a22dce6d7c4	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
5bcc1bb9-ef4d-405c-85b4-d1eae059d234	00000000-0000-4000-8000-000000000002	174e0fd0-9df9-455d-85d3-b0c64a332c7e	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
e69fece8-25aa-4281-a721-08a32709aac4	00000000-0000-4000-8000-000000000002	600bb424-23f6-49e5-867a-1b68bb867487	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
b12db741-163a-484c-84ac-6cce9d45d142	00000000-0000-4000-8000-000000000002	4fae1b8e-f752-4cdd-8edd-0e80b28d5920	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a149c445-1069-4e9d-a769-23d79bfb7a26	00000000-0000-4000-8000-000000000002	45d27ef5-9738-4221-a9a8-3a2774a54af8	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
bfc1034a-3469-41d5-a11f-d746a4191646	00000000-0000-4000-8000-000000000002	7f9c8fa6-dff5-4c8e-b7ad-3c085e605db6	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
533fe575-7242-4091-a888-505724801745	00000000-0000-4000-8000-000000000002	c5cfd039-3e48-42e1-bd1d-08d0b1bc91d5	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
69d9ea2b-4132-448d-85f2-c2f15e0b6e50	00000000-0000-4000-8000-000000000002	67188efe-b2bf-4e9d-bb66-f130743e4e88	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
a1bfc84c-ae4f-4adb-85d8-0963b872d68a	00000000-0000-4000-8000-000000000002	f3da9516-35b6-401a-8e13-55395fad5ffb	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
a2da9b05-1bf0-43fe-b516-48ec9fdd487f	00000000-0000-4000-8000-000000000002	420c44de-30c1-44f8-a9fd-add847921f04	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
bd2de56b-4d9e-47fb-a7c9-eb2b4c910f90	00000000-0000-4000-8000-000000000002	f869771d-6515-4a77-82e8-4f07a8a54166	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
6d056c57-2d8c-43e3-866f-d2696f5de8bd	00000000-0000-4000-8000-000000000002	547f4d14-6e20-4649-add1-2995135651ad	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
f0624b36-3044-41e5-afa6-3e8775f1f091	00000000-0000-4000-8000-000000000002	728b37bb-0034-4495-86c9-d649066a37bf	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
5c04fa1c-b448-4654-a263-d242aa497316	00000000-0000-4000-8000-000000000002	56f644d5-18c1-48b8-a1d7-31d78261985f	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
69e6da00-faab-4b68-87ae-77f819cbc080	00000000-0000-4000-8000-000000000002	23c6c073-9147-46bd-a338-f8dd936cc45e	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
6c5120d7-03e8-4d72-8e65-39f1d7df081e	00000000-0000-4000-8000-000000000002	f4d8f3a1-9ae3-4d02-bbf8-69d458ca61f8	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
958f6e89-35bd-4590-8810-9a81d9635819	00000000-0000-4000-8000-000000000002	d0344a54-a1d1-45b5-b378-012b9e652907	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
5097f602-8295-4445-805b-c1aa20e8c134	00000000-0000-4000-8000-000000000002	1ce78f96-c9d9-4dda-8eb6-3a5dd2730b44	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
51b1b9e4-25d1-43b9-baf9-41db8b6a41d2	00000000-0000-4000-8000-000000000002	6013013e-161c-4327-89a8-80f17e963550	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
d2c4f292-fdf4-4241-b519-bfa2f2c3d7e5	00000000-0000-4000-8000-000000000002	2688af1d-030e-4246-8a39-b3dc880434d5	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
216c129f-5235-4272-b403-4b9eeef27e08	00000000-0000-4000-8000-000000000002	4fbff47c-292c-464b-b6d6-38f2e29073a1	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
a81e0ab6-c44b-4d5c-ab3d-cc114d0e4f15	00000000-0000-4000-8000-000000000002	0e90aa11-9c5f-4655-94ef-213d8761b3d7	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
5aff8417-7a74-4613-9292-e4ff8ab34fd2	00000000-0000-4000-8000-000000000002	355ca053-fb1b-44d4-8375-53b5b51d6b5d	t	2026-06-24 02:48:42.367-07	2026-06-24 02:48:42.367-07
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.roles (role_id, name, description, is_active, created_at, updated_at, deleted_at) FROM stdin;
00000000-0000-4000-8000-000000000002	Super Admin	Full access to all resources and actions.	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07	\N
\.


--
-- Data for Name: route_translations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.route_translations (route_translation_id, route_id, language_code, label, created_at, updated_at) FROM stdin;
9989d5e9-9896-4f89-b94d-d5a8a5bbaa14	b1c4b24a-f96d-413b-bf75-10561d8059d3	en	Home	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
92b7c0c6-72a7-4f9b-9580-7f1cf03bd58e	b1c4b24a-f96d-413b-bf75-10561d8059d3	am	መነሻ	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
7abdd71e-5aef-46a6-b519-5e0edc1d0318	3c8a6620-af06-4e8c-97bc-9927b5f66727	en	Sector	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
04121d97-95b6-4af0-8043-dced8b4ced54	3c8a6620-af06-4e8c-97bc-9927b5f66727	am	ዘርፍ	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
7334273c-ee42-49c2-99e5-9ee60e9139f1	0c6587f6-5cbc-441b-803e-abef24c94ebc	en	Mining	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
6745196f-97ad-4599-9038-77ef5a52289c	0c6587f6-5cbc-441b-803e-abef24c94ebc	am	ማዕድን	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
0493c944-d8c8-42d7-869c-1b1f80bfe341	7bb762f7-a51f-45fe-b4b3-ac17693a3d13	en	Geothermal	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
944434f7-d282-4e16-a1a5-17575a546097	7bb762f7-a51f-45fe-b4b3-ac17693a3d13	am	ጂኦተርማል	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
6700aa6e-9218-4d0c-8cad-47d54f64406a	c806c92e-1689-4588-ac5f-329b36b5e5a6	en	Petroleum	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
6aaef829-c7f8-41f3-8458-f156873f9dd1	c806c92e-1689-4588-ac5f-329b36b5e5a6	am	ነዳጅ	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
4779fe1b-759e-4117-945c-216496b3df97	98856713-3373-44ec-badf-34ffa4dd9701	en	About	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
a8f395f8-fc6d-4f28-9ff5-24787fa5e57f	98856713-3373-44ec-badf-34ffa4dd9701	am	ስለ እኛ	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
ae99e570-d24a-45a4-aa43-ef71122caa0c	6ee68e17-8242-4122-9bf2-27de3444ef39	en	ASM	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
fc6ed65e-33ab-491c-8871-d0640440468c	6ee68e17-8242-4122-9bf2-27de3444ef39	am	ASM	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
d75cab68-0066-4766-b73b-c4d45c7a2449	1adb1587-d5b4-4b29-b701-257921c9f066	en	Investigating in Ethiopia	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
39544153-0ba7-4f1b-8deb-e756a139b2a9	1adb1587-d5b4-4b29-b701-257921c9f066	am	በኢትዮጵያ ምርመራ	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
16ff39cb-296d-4b51-be8c-d70d2ad991e2	2961500f-c1de-400c-afbf-0b53d0644ba4	en	Services	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
655790da-81f2-452c-adaa-aa73331e225f	2961500f-c1de-400c-afbf-0b53d0644ba4	am	አገልግሎቶች	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
7894a0d9-1712-40b3-b703-59ae0f1df8b1	68455f57-921e-4abe-bd94-987d75f3d67c	en	News	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
b92b98ab-5984-471d-bf93-1ac94f7018b6	68455f57-921e-4abe-bd94-987d75f3d67c	am	ዜና	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
87226848-7eb1-48b5-89c8-7bde619c91a4	2bd0b8fe-8a66-4474-a246-00c4a96a1363	en	Events	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
b98def0c-92ae-4536-9eae-eee9326d5f1a	2bd0b8fe-8a66-4474-a246-00c4a96a1363	am	ክስተቶች	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
6ca04705-1e67-42ad-b3dd-d5fd3f83967e	4ac4f3fc-1cdb-4609-970c-0cf425217c8a	en	Contact	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
ff4cd676-bcc7-43af-a7a3-3b17d0b37bcf	4ac4f3fc-1cdb-4609-970c-0cf425217c8a	am	አግኙን	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.routes (route_id, path, parent_id, "order", is_active, show_in_navbar, created_at, updated_at) FROM stdin;
b1c4b24a-f96d-413b-bf75-10561d8059d3	/	\N	1	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
3c8a6620-af06-4e8c-97bc-9927b5f66727	\N	\N	2	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
0c6587f6-5cbc-441b-803e-abef24c94ebc	/mining	3c8a6620-af06-4e8c-97bc-9927b5f66727	1	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
c806c92e-1689-4588-ac5f-329b36b5e5a6	/petroleum	3c8a6620-af06-4e8c-97bc-9927b5f66727	3	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
98856713-3373-44ec-badf-34ffa4dd9701	/about	\N	3	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
6ee68e17-8242-4122-9bf2-27de3444ef39	/asm	\N	4	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
1adb1587-d5b4-4b29-b701-257921c9f066	/investigating-in-ethiopia	\N	5	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
2961500f-c1de-400c-afbf-0b53d0644ba4	/services	\N	6	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
68455f57-921e-4abe-bd94-987d75f3d67c	/news	\N	7	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
2bd0b8fe-8a66-4474-a246-00c4a96a1363	/events	\N	8	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
4ac4f3fc-1cdb-4609-970c-0cf425217c8a	/contact	\N	9	t	t	2026-04-28 06:48:34.854-07	2026-04-28 06:48:34.854-07
7bb762f7-a51f-45fe-b4b3-ac17693a3d13	/geothermal	3c8a6620-af06-4e8c-97bc-9927b5f66727	2	t	t	2026-04-28 06:48:34.854-07	2026-05-04 12:08:42.519-07
\.


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.services (service_id, icon, title, content, created_at) FROM stdin;
5de2bb9f-1744-4f3e-b2da-64c6ba97f4d7	FileCheck	Mining License Issuance	Grants exploration, mining, and artisanal licenses in compliance with national regulations.	2026-05-04 05:22:54.562-07
4ab3ec6d-60e6-4364-bb8f-7c9197896a8d	MapPinHouse	Geological Survey & Data Services	Provides geoscience data, mineral mapping, and exploration insights to support investment and research.	2026-05-04 05:23:33.11-07
10f25296-8f9d-4bdc-8706-f7abc310b377	LucideDatabaseZap	Mining Cadastre Management	Manages digital mining rights, licenses, and land use through a transparent cadastre system.	2026-05-04 05:24:08.22-07
074940c7-c536-4eaf-8f69-d1ad6da7eb2d	BriefcaseBusinessIcon	Investment Facilitation	Supports local and international investors with guidance, approvals, and sector opportunities.	2026-05-04 05:24:44.316-07
276bfd83-09b6-44fb-b16a-8ba2e1e06d0c	Scale	Regulation & Compliance Monitoring	Ensures mining activities follow legal, safety, and environmental standards.	2026-05-04 05:25:32.919-07
929b95dd-0d62-43cd-b78a-9e60ccafab73	LucideLeaf	Environmental & Social Oversight	Promotes sustainable mining practices and monitors environmental and community impacts.	2026-05-04 05:25:56.405-07
c015d99c-41f1-47f5-b6ea-e5282d37c22d	LucideFactory	Mineral Value Addition Support	Encourages processing, refining, and local value addition to increase economic returns.	2026-05-04 05:26:21.103-07
6848ce4c-489d-496d-97e6-72d4dd88fb7a	LucideUsers	Artisanal Mining Support	Assists small-scale miners with formalization, training, and access to resources.	2026-05-04 05:26:37.889-07
adfbc53c-d189-4384-ad87-d9d4260a8b77	LucideBookOpenCheck	Policy Development & Reform	Develops policies and strategies to modernize and strengthen the mining sector.	2026-05-04 05:27:02.176-07
a55c59de-5359-4e28-85e1-e59753429155	FlaskConicalIcon	Laboratory & Testing Services	Provides mineral testing, quality analysis, and certification services.	2026-05-04 05:27:37.89-07
\.


--
-- Data for Name: sliders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sliders (slider_id, title, description, attachment_id, "order", created_at, updated_at, deleted_at, button_name, button_url, button2_name, button2_url) FROM stdin;
53bbc36d-fd2b-4bef-8c46-6923d1d1914e	Driving Ethiopia’s Mineral Future	Unlocking the nation’s mineral wealth through sustainable exploration, responsible mining, and transparent governance for economic growth.	91b5afae-abc5-4f9b-ac0a-1cef4845a528	0	2026-04-28 21:36:40.469-07	2026-04-28 21:45:07.484-07	\N	\N	\N	\N	\N
fe805f29-9f9b-4fef-8967-71ab45462a2d	Sustainable Mining for National Growth	Promoting environmentally responsible mining practices that protect communities while contributing to Ethiopia’s development.	bda60769-3a7f-4a09-b119-9da23c75db60	0	2026-04-28 21:50:54.413-07	2026-04-28 21:59:36.361-07	\N	\N	\N	\N	\N
5e06211b-38c9-4b17-963f-5c2fc942b2e1	Empowering Investment in Natural Resources	Creating a transparent and investor-friendly environment to attract global partnerships in Ethiopia’s mining sector.	fe50ac36-5dcb-422f-bb4a-ac503118faed	0	2026-04-28 22:00:05.767-07	2026-04-28 22:19:42.464-07	\N	\N	\N	\N	\N
97bc6ac2-43aa-473d-ba6b-342f553d3d63	Harnessing Ethiopia’s Mineral Potential	From gold to industrial minerals, we are committed to maximizing value from our natural resources for future generations.	058f02be-e6f8-4f5d-8221-0a15afa2ca0e	0	2026-04-28 22:22:48.68-07	2026-04-28 22:38:32.703-07	\N	\N	\N	\N	\N
68ecddc8-0475-4215-b8f5-2757af1d75c1	Innovation and Excellence in Mining	Leveraging modern technology and expertise to improve efficiency, safety, and productivity in the mining industry.	29a3598c-d576-42c3-aa22-8e8415fb623b	0	2026-04-28 22:39:14.215-07	2026-04-28 22:43:51.532-07	\N	\N	\N	\N	\N
\.


--
-- Data for Name: snapshot; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.snapshot (snapshot_id, title, sector, description_one, description_two, attachment_id, attachment_description, is_published, created_at, updated_at, deleted_at) FROM stdin;
c1e29fea-cb5b-4468-a7c3-a79458806404	Ministry of Mines (MoM)	mining	Driving Sustainable Growth Through Ethiopia’s Mineral Resources	The Ministry of Mines is a key government institution responsible for regulating and developing Ethiopia’s mining and petroleum sectors. Reestablished under Proclamation No. 1097/2018, the Ministry plays a central role in granting exploration and mining licenses, promoting investment, and ensuring sustainable resource management. As part of Ethiopia’s homegrown economic reform agenda, the Ministry is committed to modernizing the sector, enhancing transparency, and positioning the country as a leading destination for global investors.	23826669-254d-4cbf-b243-35dd65f61530	FDRE Ministry of Mines	t	2026-04-29 04:32:04.544-07	2026-04-29 04:34:05.808-07	\N
\.


--
-- Data for Name: snapshot_section; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.snapshot_section (section_id, snapshot_id, title, content, created_at, updated_at) FROM stdin;
9d1d0c22-04e9-40c8-a6d2-e6d3e3407539	c1e29fea-cb5b-4468-a7c3-a79458806404	Mandate and Responsibilities	The Ministry regulates Ethiopia’s mining and petroleum sectors by managing licensing, enforcing policies, and ensuring responsible resource development.	2026-04-29 04:34:05.816-07	2026-04-29 04:34:05.816-07
ad0c5a7f-e9b5-410a-89b3-ad8f06306c86	c1e29fea-cb5b-4468-a7c3-a79458806404	Strategic Mineral Promotion	The Ministry promotes Ethiopia’s key minerals like gold, opal, and lithium while supporting responsible extraction and value addition.	2026-04-29 04:34:05.816-07	2026-04-29 04:34:05.816-07
ad6366da-4d81-4154-9a94-6d2e32156529	c1e29fea-cb5b-4468-a7c3-a79458806404	Institutional Framework	The Ministry works with specialized institutions to support geoscience research, laboratory services, and commercial mining activities.	2026-04-29 04:34:05.816-07	2026-04-29 04:34:05.816-07
\.


--
-- Data for Name: social_medias; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.social_medias (social_media_id, platform_name, icon, url, created_at, updated_at, deleted_at) FROM stdin;
4aaa9f6b-95f8-494f-b97b-58af4941a870	Facebook	Facebook	https://www.facebook.com/MinesandPetroleum/	2026-05-04 02:04:47.607-07	2026-05-04 02:04:47.607-07	\N
198441eb-aef4-4980-b765-594fee03f373	Linkedin	Linkedin	https://www.linkedin.com/company/ministry-of-mines-ethiopia/	2026-05-04 02:04:51.833-07	2026-05-04 02:04:51.833-07	\N
cdb614c9-de34-46fb-b164-2dd2d749a564	Twitter	LucideTwitter	https://x.com/MinistryofMine_	2026-05-04 02:04:57.621-07	2026-05-04 02:04:57.621-07	\N
cb63ef14-622b-48f8-bc70-d83012d66053	Telegram	LucideSend	https://t.me/momEthi	2026-05-04 02:07:53.711-07	2026-05-04 02:07:53.711-07	\N
\.


--
-- Data for Name: steps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.steps (step_id, process_step_id, description, attachment_id, "order", created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: strategies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.strategies (strategy_id, title, description, created_at, updated_at, deleted_at) FROM stdin;
2a6c650b-a22d-4290-8689-613102263826	Our Mission, Vision & Core Values	Guiding principles that define our purpose, direction, and commitment to developing Ethiopia’s mineral resources responsibly and sustainably.	2026-04-28 23:11:02.393-07	2026-05-06 00:44:02.898-07	\N
\.


--
-- Data for Name: strategy_sections; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.strategy_sections (section_id, strategy_id, type, title, attachment_id, content) FROM stdin;
b5d62e68-cea2-42df-8a82-0cee9fb3b0e9	2a6c650b-a22d-4290-8689-613102263826	mission	Our Mission	bed2b9fc-17d5-4ddf-89b0-c6522c2da72c	"To sustainably develop mineral wealth and transform it into a vital capital source to drive sovereign national growth."
076b6a26-d86e-463b-ac83-290f2338f139	2a6c650b-a22d-4290-8689-613102263826	vision	Our Vision	737ce471-6078-4c06-9cb5-4e2912dd6ba7	"To realize a future where our mineral resources serve as the bedrock of national prosperity by 2030 (2022 E.C.)."
edc22acf-b804-4212-a12a-6cfea539a850	2a6c650b-a22d-4290-8689-613102263826	core_values	Core Values	f11861df-6e14-4dae-8c30-a2031626751a	\N
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tags (tag_id, name, created_at) FROM stdin;
48927f9e-e3ea-4e6f-a6af-ac49fe231143	Community	2026-05-05 23:39:18.03-07
265ec3a0-5c35-44f8-8f70-75802937a4a5	MiningProjects	2026-05-05 23:49:54.054-07
664985fa-a6a7-4c32-b2e7-3f03ac47300b	Manufacturing	2026-05-05 23:50:06.673-07
0bb19d7b-5369-4aa1-ad8c-05b465083b9a	EconomicGrowth	2026-05-06 00:00:56.525-07
\.


--
-- Data for Name: tenders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tenders (tender_id, title, reference_number, description, published_date, closing_date, attachment_id, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_roles (user_role_id, user_id, role_id, assigned_by, assigned_at, is_active, created_at, updated_at) FROM stdin;
b715efca-3215-4723-8ced-860ccfc8a5b5	00000000-0000-4000-8000-000000000001	00000000-0000-4000-8000-000000000002	\N	2026-04-28 06:48:35.057-07	t	2026-04-28 06:48:35.057-07	2026-04-28 06:48:35.057-07
\.


--
-- Data for Name: user_types; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_types (user_type_id, name, description, created_at, updated_at) FROM stdin;
dc4f32c2-38f5-4a58-8cd6-23880e05c77b	test_one	Test user type one for development or testing purposes.	2026-04-28 06:48:34.846-07	2026-04-28 06:48:34.846-07
d77941fe-0e0f-417f-8508-4ab76f52e37a	test_two	Test user type two for development or testing purposes.	2026-04-28 06:48:34.846-07	2026-04-28 06:48:34.846-07
da7d8844-6f2e-4670-95cd-38807cfc8b24	test_three	Test user type three for development or testing purposes.	2026-04-28 06:48:34.846-07	2026-04-28 06:48:34.846-07
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (user_id, user_type_id, full_name, email, password, phone_number, profile_image, is_first_logged_in, last_login_at, password_changed_at, reset_password_otp, reset_password_otp_expires, is_active, created_at, updated_at) FROM stdin;
00000000-0000-4000-8000-000000000001	\N	Admin Account	admin@gmail.com	$2b$10$Xg.K7za2Pg3QFvSD4KB.DeyRWgWxXIbLNDhN5Xts2RkQInfBICHZO	251911000001	\N	f	2026-06-21 12:29:23.566-07	2026-04-28 06:51:29.524-07	\N	\N	t	2026-04-28 06:48:35.057-07	2026-04-28 06:51:29.524-07
\.


--
-- Data for Name: vacancies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vacancies (vacancy_id, job_title, department, location, employment_type, positions, description, requirements, published_date, application_deadline, attachment_id, status, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: asm_attachments asm_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm_attachments
    ADD CONSTRAINT asm_attachments_pkey PRIMARY KEY (asm_attachment_id);


--
-- Name: asm asm_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm
    ADD CONSTRAINT asm_pkey PRIMARY KEY (asm_id);


--
-- Name: asm_previews asm_previews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm_previews
    ADD CONSTRAINT asm_previews_pkey PRIMARY KEY (preview_id);


--
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (attachment_id);


--
-- Name: audit_logs audit_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_pkey PRIMARY KEY (audit_id);


--
-- Name: background_attachments background_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.background_attachments
    ADD CONSTRAINT background_attachments_pkey PRIMARY KEY (background_attachment_id);


--
-- Name: backgrounds backgrounds_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.backgrounds
    ADD CONSTRAINT backgrounds_pkey PRIMARY KEY (background_id);


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (card_id);


--
-- Name: core_values core_values_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_values
    ADD CONSTRAINT core_values_pkey PRIMARY KEY (value_id);


--
-- Name: event_attachments event_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_attachments
    ADD CONSTRAINT event_attachments_pkey PRIMARY KEY (event_attachment_id);


--
-- Name: event_categories event_categories_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT event_categories_name_key UNIQUE (name);


--
-- Name: event_categories event_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_categories
    ADD CONSTRAINT event_categories_pkey PRIMARY KEY (event_category_id);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (event_id);


--
-- Name: federal_office_contacts federal_office_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.federal_office_contacts
    ADD CONSTRAINT federal_office_contacts_pkey PRIMARY KEY (federal_office_id);


--
-- Name: footer_sections footer_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_sections
    ADD CONSTRAINT footer_sections_pkey PRIMARY KEY (footer_section_id);


--
-- Name: footers footers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footers
    ADD CONSTRAINT footers_pkey PRIMARY KEY (footer_id);


--
-- Name: gamestone_attachments gamestone_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gamestone_attachments
    ADD CONSTRAINT gamestone_attachments_pkey PRIMARY KEY (gamestone_attachment_id);


--
-- Name: gamestones gamestones_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gamestones
    ADD CONSTRAINT gamestones_pkey PRIMARY KEY (gamestone_id);


--
-- Name: investigate_ethiopia investigate_ethiopia_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investigate_ethiopia
    ADD CONSTRAINT investigate_ethiopia_pkey PRIMARY KEY (investigate_ethiopia_id);


--
-- Name: investigation_action investigation_action_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investigation_action
    ADD CONSTRAINT investigation_action_pkey PRIMARY KEY (investigation_action_id);


--
-- Name: investigation_strategy investigation_strategy_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investigation_strategy
    ADD CONSTRAINT investigation_strategy_pkey PRIMARY KEY (investigation_strategy_id);


--
-- Name: leadership_attachments leadership_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leadership_attachments
    ADD CONSTRAINT leadership_attachments_pkey PRIMARY KEY (leadership_attachment_id);


--
-- Name: leadership leadership_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leadership
    ADD CONSTRAINT leadership_name_key UNIQUE (name);


--
-- Name: leadership leadership_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leadership
    ADD CONSTRAINT leadership_pkey PRIMARY KEY (leadership_id);


--
-- Name: licensing_contacts licensing_contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licensing_contacts
    ADD CONSTRAINT licensing_contacts_pkey PRIMARY KEY (licensing_contact_id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (message_id);


--
-- Name: mining_application_process_attachments mining_application_process_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_application_process_attachments
    ADD CONSTRAINT mining_application_process_attachments_pkey PRIMARY KEY (mining_application_process_attachment_id);


--
-- Name: mining_application_process mining_application_process_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_application_process
    ADD CONSTRAINT mining_application_process_pkey PRIMARY KEY (mining_application_process_id);


--
-- Name: mining_application_types mining_application_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_application_types
    ADD CONSTRAINT mining_application_types_pkey PRIMARY KEY (mining_application_types_id);


--
-- Name: mining_framework mining_framework_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_framework
    ADD CONSTRAINT mining_framework_pkey PRIMARY KEY (mining_framework_id);


--
-- Name: mining_guideline_attachments mining_guideline_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline_attachments
    ADD CONSTRAINT mining_guideline_attachments_pkey PRIMARY KEY (mining_guideline_attachment_id);


--
-- Name: mining_guideline_content mining_guideline_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline_content
    ADD CONSTRAINT mining_guideline_content_pkey PRIMARY KEY (mining_guideline_content_id);


--
-- Name: mining_guideline mining_guideline_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline
    ADD CONSTRAINT mining_guideline_pkey PRIMARY KEY (mining_guideline_id);


--
-- Name: mining_regulation_process mining_regulation_process_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_regulation_process
    ADD CONSTRAINT mining_regulation_process_pkey PRIMARY KEY (mining_regulation_process_id);


--
-- Name: mining_service_card mining_service_card_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_service_card
    ADD CONSTRAINT mining_service_card_pkey PRIMARY KEY (mining_service_card_id);


--
-- Name: mining_service mining_service_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_service
    ADD CONSTRAINT mining_service_pkey PRIMARY KEY (mining_service_id);


--
-- Name: news_attachments news_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_attachments
    ADD CONSTRAINT news_attachments_pkey PRIMARY KEY (news_attachment_id);


--
-- Name: news_feedbacks news_feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_feedbacks
    ADD CONSTRAINT news_feedbacks_pkey PRIMARY KEY (news_feedback_id);


--
-- Name: news_metadata news_metadata_news_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_metadata
    ADD CONSTRAINT news_metadata_news_id_key UNIQUE (news_id);


--
-- Name: news_metadata news_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_metadata
    ADD CONSTRAINT news_metadata_pkey PRIMARY KEY (news_metadata_id);


--
-- Name: news news_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (news_id);


--
-- Name: news_reactions news_reactions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_reactions
    ADD CONSTRAINT news_reactions_pkey PRIMARY KEY (news_reaction_id);


--
-- Name: news_reads news_reads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_reads
    ADD CONSTRAINT news_reads_pkey PRIMARY KEY (news_read_id);


--
-- Name: news_tags news_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_tags
    ADD CONSTRAINT news_tags_pkey PRIMARY KEY (news_tag_id);


--
-- Name: objectives objectives_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objectives
    ADD CONSTRAINT objectives_pkey PRIMARY KEY (objective_id);


--
-- Name: partner_attachments partner_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_attachments
    ADD CONSTRAINT partner_attachments_pkey PRIMARY KEY (partner_attachment_id);


--
-- Name: partners partners_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partners
    ADD CONSTRAINT partners_pkey PRIMARY KEY (partner_id);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (permission_id);


--
-- Name: permissions permissions_resource_action_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_resource_action_unique UNIQUE (resource, action);


--
-- Name: petroleum_attachments petroleum_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_attachments
    ADD CONSTRAINT petroleum_attachments_pkey PRIMARY KEY (petroleum_attachment_id);


--
-- Name: petroleum_directive petroleum_directive_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_directive
    ADD CONSTRAINT petroleum_directive_pkey PRIMARY KEY (petroleum_directive_id);


--
-- Name: petroleum_objective petroleum_objective_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_objective
    ADD CONSTRAINT petroleum_objective_pkey PRIMARY KEY (petroleum_objective_id);


--
-- Name: petroleum_processes petroleum_processes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_processes
    ADD CONSTRAINT petroleum_processes_pkey PRIMARY KEY (petroleum_process_id);


--
-- Name: petroleum_regulation_attachments petroleum_regulation_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_regulation_attachments
    ADD CONSTRAINT petroleum_regulation_attachments_pkey PRIMARY KEY (petroleum_regulation_attachment_id);


--
-- Name: petroleum_regulation petroleum_regulation_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_regulation
    ADD CONSTRAINT petroleum_regulation_pkey PRIMARY KEY (petroleum_regulation_id);


--
-- Name: petroleum_regulation_process petroleum_regulation_process_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_regulation_process
    ADD CONSTRAINT petroleum_regulation_process_pkey PRIMARY KEY (petroleum_regulation_process_id);


--
-- Name: process_block_attachments process_block_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_block_attachments
    ADD CONSTRAINT process_block_attachments_pkey PRIMARY KEY (process_block_attachment_id);


--
-- Name: process_blocks process_blocks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_blocks
    ADD CONSTRAINT process_blocks_pkey PRIMARY KEY (process_block_id);


--
-- Name: process_steps process_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_steps
    ADD CONSTRAINT process_steps_pkey PRIMARY KEY (process_step_id);


--
-- Name: regional_office_contact_centers regional_office_contact_centers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regional_office_contact_centers
    ADD CONSTRAINT regional_office_contact_centers_pkey PRIMARY KEY (regional_office_id);


--
-- Name: regions regions_code_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_code_key UNIQUE (code);


--
-- Name: regions regions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regions
    ADD CONSTRAINT regions_pkey PRIMARY KEY (region_id);


--
-- Name: resource_attachments resource_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource_attachments
    ADD CONSTRAINT resource_attachments_pkey PRIMARY KEY (resource_attachment_id);


--
-- Name: resource resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (resource_id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_permission_id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: route_translations route_translations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_translations
    ADD CONSTRAINT route_translations_pkey PRIMARY KEY (route_translation_id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (route_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: services services_title_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_title_key UNIQUE (title);


--
-- Name: sliders sliders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sliders
    ADD CONSTRAINT sliders_pkey PRIMARY KEY (slider_id);


--
-- Name: snapshot snapshot_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshot
    ADD CONSTRAINT snapshot_pkey PRIMARY KEY (snapshot_id);


--
-- Name: snapshot_section snapshot_section_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshot_section
    ADD CONSTRAINT snapshot_section_pkey PRIMARY KEY (section_id);


--
-- Name: social_medias social_medias_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.social_medias
    ADD CONSTRAINT social_medias_pkey PRIMARY KEY (social_media_id);


--
-- Name: social_medias social_medias_platform_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.social_medias
    ADD CONSTRAINT social_medias_platform_name_key UNIQUE (platform_name);


--
-- Name: social_medias social_medias_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.social_medias
    ADD CONSTRAINT social_medias_url_key UNIQUE (url);


--
-- Name: steps steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.steps
    ADD CONSTRAINT steps_pkey PRIMARY KEY (step_id);


--
-- Name: strategies strategies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strategies
    ADD CONSTRAINT strategies_pkey PRIMARY KEY (strategy_id);


--
-- Name: strategy_sections strategy_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strategy_sections
    ADD CONSTRAINT strategy_sections_pkey PRIMARY KEY (section_id);


--
-- Name: tags tags_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_key UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (tag_id);


--
-- Name: tenders tenders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenders
    ADD CONSTRAINT tenders_pkey PRIMARY KEY (tender_id);


--
-- Name: route_translations unique_route_language; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_translations
    ADD CONSTRAINT unique_route_language UNIQUE (route_id, language_code);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_role_id);


--
-- Name: user_types user_types_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_name_key UNIQUE (name);


--
-- Name: user_types user_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_pkey PRIMARY KEY (user_type_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: vacancies vacancies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT vacancies_pkey PRIMARY KEY (vacancy_id);


--
-- Name: audit_logs_model_name_record_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX audit_logs_model_name_record_id ON public.audit_logs USING btree (model_name, record_id);


--
-- Name: audit_logs_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX audit_logs_user_id ON public.audit_logs USING btree (user_id);


--
-- Name: news_reactions_news_id_ip_address; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX news_reactions_news_id_ip_address ON public.news_reactions USING btree (news_id, ip_address);


--
-- Name: news_reads_news_id_ip_address; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX news_reads_news_id_ip_address ON public.news_reads USING btree (news_id, ip_address);


--
-- Name: news_tags_news_id_tag_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX news_tags_news_id_tag_id ON public.news_tags USING btree (news_id, tag_id);


--
-- Name: resource_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resource_created_at ON public.resource USING btree (created_at);


--
-- Name: resource_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resource_deleted_at ON public.resource USING btree (deleted_at);


--
-- Name: resource_sector; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX resource_sector ON public.resource USING btree (sector);


--
-- Name: route_translations_language_code; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX route_translations_language_code ON public.route_translations USING btree (language_code);


--
-- Name: route_translations_route_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX route_translations_route_id ON public.route_translations USING btree (route_id);


--
-- Name: routes_is_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX routes_is_active ON public.routes USING btree (is_active);


--
-- Name: routes_order; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX routes_order ON public.routes USING btree ("order");


--
-- Name: routes_parent_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX routes_parent_id ON public.routes USING btree (parent_id);


--
-- Name: routes_path; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX routes_path ON public.routes USING btree (path);


--
-- Name: tenders_closing_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenders_closing_date ON public.tenders USING btree (closing_date);


--
-- Name: tenders_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenders_deleted_at ON public.tenders USING btree (deleted_at);


--
-- Name: tenders_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tenders_status ON public.tenders USING btree (status);


--
-- Name: vacancies_application_deadline; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vacancies_application_deadline ON public.vacancies USING btree (application_deadline);


--
-- Name: vacancies_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vacancies_deleted_at ON public.vacancies USING btree (deleted_at);


--
-- Name: vacancies_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vacancies_status ON public.vacancies USING btree (status);


--
-- Name: asm_attachments asm_attachments_asm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm_attachments
    ADD CONSTRAINT asm_attachments_asm_id_fkey FOREIGN KEY (asm_id) REFERENCES public.asm(asm_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: asm_attachments asm_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm_attachments
    ADD CONSTRAINT asm_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: asm_previews asm_previews_asm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm_previews
    ADD CONSTRAINT asm_previews_asm_id_fkey FOREIGN KEY (asm_id) REFERENCES public.asm(asm_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: asm_previews asm_previews_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.asm_previews
    ADD CONSTRAINT asm_previews_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: audit_logs audit_logs_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.audit_logs
    ADD CONSTRAINT audit_logs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: background_attachments background_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.background_attachments
    ADD CONSTRAINT background_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: background_attachments background_attachments_background_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.background_attachments
    ADD CONSTRAINT background_attachments_background_id_fkey FOREIGN KEY (background_id) REFERENCES public.backgrounds(background_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: cards cards_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: core_values core_values_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.core_values
    ADD CONSTRAINT core_values_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.strategy_sections(section_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_attachments event_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_attachments
    ADD CONSTRAINT event_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: event_attachments event_attachments_event_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_attachments
    ADD CONSTRAINT event_attachments_event_id_fkey FOREIGN KEY (event_id) REFERENCES public.events(event_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: events events_event_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_event_category_id_fkey FOREIGN KEY (event_category_id) REFERENCES public.event_categories(event_category_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: footer_sections footer_sections_footer_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_sections
    ADD CONSTRAINT footer_sections_footer_id_fkey FOREIGN KEY (footer_id) REFERENCES public.footers(footer_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: footers footers_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footers
    ADD CONSTRAINT footers_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: gamestone_attachments gamestone_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gamestone_attachments
    ADD CONSTRAINT gamestone_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gamestone_attachments gamestone_attachments_gamestone_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gamestone_attachments
    ADD CONSTRAINT gamestone_attachments_gamestone_id_fkey FOREIGN KEY (gamestone_id) REFERENCES public.gamestones(gamestone_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: gamestones gamestones_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gamestones
    ADD CONSTRAINT gamestones_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: gamestones gamestones_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gamestones
    ADD CONSTRAINT gamestones_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.gamestones(gamestone_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: investigation_action investigation_action_investigate_ethiopia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investigation_action
    ADD CONSTRAINT investigation_action_investigate_ethiopia_id_fkey FOREIGN KEY (investigate_ethiopia_id) REFERENCES public.investigate_ethiopia(investigate_ethiopia_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: investigation_strategy investigation_strategy_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investigation_strategy
    ADD CONSTRAINT investigation_strategy_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: investigation_strategy investigation_strategy_investigate_ethiopia_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investigation_strategy
    ADD CONSTRAINT investigation_strategy_investigate_ethiopia_id_fkey FOREIGN KEY (investigate_ethiopia_id) REFERENCES public.investigate_ethiopia(investigate_ethiopia_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leadership_attachments leadership_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leadership_attachments
    ADD CONSTRAINT leadership_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: leadership_attachments leadership_attachments_leadership_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.leadership_attachments
    ADD CONSTRAINT leadership_attachments_leadership_id_fkey FOREIGN KEY (leadership_id) REFERENCES public.leadership(leadership_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: licensing_contacts licensing_contacts_regional_office_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.licensing_contacts
    ADD CONSTRAINT licensing_contacts_regional_office_id_fkey FOREIGN KEY (regional_office_id) REFERENCES public.regional_office_contact_centers(regional_office_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_application_process_attachments mining_application_process_at_mining_application_process_i_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_application_process_attachments
    ADD CONSTRAINT mining_application_process_at_mining_application_process_i_fkey FOREIGN KEY (mining_application_process_id) REFERENCES public.mining_application_process(mining_application_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_application_process_attachments mining_application_process_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_application_process_attachments
    ADD CONSTRAINT mining_application_process_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_application_types mining_application_types_mining_application_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_application_types
    ADD CONSTRAINT mining_application_types_mining_application_process_id_fkey FOREIGN KEY (mining_application_process_id) REFERENCES public.mining_application_process(mining_application_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_framework mining_framework_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_framework
    ADD CONSTRAINT mining_framework_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: mining_framework mining_framework_mining_regulation_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_framework
    ADD CONSTRAINT mining_framework_mining_regulation_process_id_fkey FOREIGN KEY (mining_regulation_process_id) REFERENCES public.mining_regulation_process(mining_regulation_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_guideline_attachments mining_guideline_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline_attachments
    ADD CONSTRAINT mining_guideline_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_guideline_attachments mining_guideline_attachments_mining_guideline_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline_attachments
    ADD CONSTRAINT mining_guideline_attachments_mining_guideline_id_fkey FOREIGN KEY (mining_guideline_id) REFERENCES public.mining_guideline(mining_guideline_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_guideline_content mining_guideline_content_mining_guideline_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline_content
    ADD CONSTRAINT mining_guideline_content_mining_guideline_id_fkey FOREIGN KEY (mining_guideline_id) REFERENCES public.mining_guideline(mining_guideline_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: mining_guideline mining_guideline_mining_regulation_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_guideline
    ADD CONSTRAINT mining_guideline_mining_regulation_process_id_fkey FOREIGN KEY (mining_regulation_process_id) REFERENCES public.mining_regulation_process(mining_regulation_process_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: mining_service_card mining_service_card_mining_service_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_service_card
    ADD CONSTRAINT mining_service_card_mining_service_id_fkey FOREIGN KEY (mining_service_id) REFERENCES public.mining_service(mining_service_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: mining_service mining_service_mining_regulation_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mining_service
    ADD CONSTRAINT mining_service_mining_regulation_process_id_fkey FOREIGN KEY (mining_regulation_process_id) REFERENCES public.mining_regulation_process(mining_regulation_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_attachments news_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_attachments
    ADD CONSTRAINT news_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_attachments news_attachments_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_attachments
    ADD CONSTRAINT news_attachments_news_id_fkey FOREIGN KEY (news_id) REFERENCES public.news(news_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_feedbacks news_feedbacks_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_feedbacks
    ADD CONSTRAINT news_feedbacks_news_id_fkey FOREIGN KEY (news_id) REFERENCES public.news(news_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_metadata news_metadata_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_metadata
    ADD CONSTRAINT news_metadata_news_id_fkey FOREIGN KEY (news_id) REFERENCES public.news(news_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_reactions news_reactions_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_reactions
    ADD CONSTRAINT news_reactions_news_id_fkey FOREIGN KEY (news_id) REFERENCES public.news(news_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_reads news_reads_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_reads
    ADD CONSTRAINT news_reads_news_id_fkey FOREIGN KEY (news_id) REFERENCES public.news(news_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_tags news_tags_news_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_tags
    ADD CONSTRAINT news_tags_news_id_fkey FOREIGN KEY (news_id) REFERENCES public.news(news_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: news_tags news_tags_tag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.news_tags
    ADD CONSTRAINT news_tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.tags(tag_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: objectives objectives_asm_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.objectives
    ADD CONSTRAINT objectives_asm_id_fkey FOREIGN KEY (asm_id) REFERENCES public.asm(asm_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: partner_attachments partner_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_attachments
    ADD CONSTRAINT partner_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: partner_attachments partner_attachments_partner_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.partner_attachments
    ADD CONSTRAINT partner_attachments_partner_id_fkey FOREIGN KEY (partner_id) REFERENCES public.partners(partner_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: petroleum_attachments petroleum_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_attachments
    ADD CONSTRAINT petroleum_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: petroleum_attachments petroleum_attachments_petroleum_objective_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_attachments
    ADD CONSTRAINT petroleum_attachments_petroleum_objective_id_fkey FOREIGN KEY (petroleum_objective_id) REFERENCES public.petroleum_objective(petroleum_objective_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: petroleum_directive petroleum_directive_petroleum_regulation_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_directive
    ADD CONSTRAINT petroleum_directive_petroleum_regulation_process_id_fkey FOREIGN KEY (petroleum_regulation_process_id) REFERENCES public.petroleum_regulation_process(petroleum_regulation_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: petroleum_regulation_attachments petroleum_regulation_attachme_petroleum_regulation_process_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_regulation_attachments
    ADD CONSTRAINT petroleum_regulation_attachme_petroleum_regulation_process_fkey FOREIGN KEY (petroleum_regulation_process_id) REFERENCES public.petroleum_regulation_process(petroleum_regulation_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: petroleum_regulation_attachments petroleum_regulation_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_regulation_attachments
    ADD CONSTRAINT petroleum_regulation_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: petroleum_regulation petroleum_regulation_petroleum_regulation_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.petroleum_regulation
    ADD CONSTRAINT petroleum_regulation_petroleum_regulation_process_id_fkey FOREIGN KEY (petroleum_regulation_process_id) REFERENCES public.petroleum_regulation_process(petroleum_regulation_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: process_block_attachments process_block_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_block_attachments
    ADD CONSTRAINT process_block_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: process_block_attachments process_block_attachments_process_block_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_block_attachments
    ADD CONSTRAINT process_block_attachments_process_block_id_fkey FOREIGN KEY (process_block_id) REFERENCES public.process_blocks(process_block_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: process_blocks process_blocks_petroleum_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_blocks
    ADD CONSTRAINT process_blocks_petroleum_process_id_fkey FOREIGN KEY (petroleum_process_id) REFERENCES public.petroleum_processes(petroleum_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: process_steps process_steps_petroleum_process_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.process_steps
    ADD CONSTRAINT process_steps_petroleum_process_id_fkey FOREIGN KEY (petroleum_process_id) REFERENCES public.petroleum_processes(petroleum_process_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: regional_office_contact_centers regional_office_contact_centers_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.regional_office_contact_centers
    ADD CONSTRAINT regional_office_contact_centers_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.regions(region_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: resource_attachments resource_attachments_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource_attachments
    ADD CONSTRAINT resource_attachments_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: resource_attachments resource_attachments_resource_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.resource_attachments
    ADD CONSTRAINT resource_attachments_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resource(resource_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(permission_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: route_translations route_translations_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.route_translations
    ADD CONSTRAINT route_translations_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(route_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: routes routes_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.routes(route_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: sliders sliders_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sliders
    ADD CONSTRAINT sliders_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: snapshot snapshot_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshot
    ADD CONSTRAINT snapshot_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: snapshot_section snapshot_section_snapshot_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.snapshot_section
    ADD CONSTRAINT snapshot_section_snapshot_id_fkey FOREIGN KEY (snapshot_id) REFERENCES public.snapshot(snapshot_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: steps steps_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.steps
    ADD CONSTRAINT steps_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: steps steps_process_step_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.steps
    ADD CONSTRAINT steps_process_step_id_fkey FOREIGN KEY (process_step_id) REFERENCES public.process_steps(process_step_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: strategy_sections strategy_sections_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strategy_sections
    ADD CONSTRAINT strategy_sections_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: strategy_sections strategy_sections_strategy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.strategy_sections
    ADD CONSTRAINT strategy_sections_strategy_id_fkey FOREIGN KEY (strategy_id) REFERENCES public.strategies(strategy_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: tenders tenders_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tenders
    ADD CONSTRAINT tenders_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users users_user_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_type_id_fkey FOREIGN KEY (user_type_id) REFERENCES public.user_types(user_type_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: vacancies vacancies_attachment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT vacancies_attachment_id_fkey FOREIGN KEY (attachment_id) REFERENCES public.attachments(attachment_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

