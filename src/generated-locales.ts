
import { Locales, Translator, TranslatorOptions } from 'localizy';

export class LocalizyLocalesProvider<T extends LocalizyLocales = LocalizyLocales> {
    private translator: Translator
    private localesMap: { [lang: string]: T } = {}

    constructor(options: TranslatorOptions) {
        this.translator = new Translator(options);
    }

    lang(lang: string) {
        if (!this.localesMap[lang]) {
            this.localesMap[lang] = this.createInstance(this.translator.locales(lang)) as T;
        }

        return this.localesMap[lang];
    }

    protected createInstance(t: Locales): T {
        return new LocalizyLocales(t) as T;
    }
}

export class LocalizyLocales {
    protected __locales: Locales
    constructor(locales: Locales) {
        this.__locales = locales;
    }

    s(key: LocalesKey, ...args: any[]) {
        return this.v(key, args);
    }

    v(key: LocalesKey, args?: any[]) {
        return this.__locales.t(key, args);
    }
    

    $24_hrs() {
        return this.v('24_hrs');
    }

    accept_notifications() {
        return this.v('accept_notifications');
    }

    ads() {
        return this.v('ads');
    }

    back_color() {
        return this.v('back_color');
    }

    base_color() {
        return this.v('base_color');
    }

    border_color() {
        return this.v('border_color');
    }

    configuration() {
        return this.v('configuration');
    }

    contact() {
        return this.v('contact');
    }

    count_news_format(_p1: number) {
        return this.v('count_news_format', Array.from(arguments));
    }

    count_places_format(_p1: number) {
        return this.v('count_places_format', Array.from(arguments));
    }

    count_views_format(_p1: number) {
        return this.v('count_views_format', Array.from(arguments));
    }

    country_al() {
        return this.v('country_al');
    }

    country_bg() {
        return this.v('country_bg');
    }

    country_cz() {
        return this.v('country_cz');
    }

    country_hu() {
        return this.v('country_hu');
    }

    country_in() {
        return this.v('country_in');
    }

    country_it() {
        return this.v('country_it');
    }

    country_md() {
        return this.v('country_md');
    }

    country_pl() {
        return this.v('country_pl');
    }

    country_ro() {
        return this.v('country_ro');
    }

    country_ru() {
        return this.v('country_ru');
    }

    country_tr() {
        return this.v('country_tr');
    }

    country_lv() {
        return this.v('country_lv');
    }

    country_kz() {
        return this.v('country_kz');
    }

    daily_horoscope_details_format(_p1: { name: string }) {
        return this.v('daily_horoscope_details_format', Array.from(arguments));
    }

    daily_horoscope_details() {
        return this.v('daily_horoscope_details');
    }

    daily_horoscope_format(_p1: { name: string }) {
        return this.v('daily_horoscope_format', Array.from(arguments));
    }

    daily_horoscope() {
        return this.v('daily_horoscope');
    }

    daily() {
        return this.v('daily');
    }

    date_format() {
        return this.v('date_format');
    }

    day_format() {
        return this.v('day_format');
    }

    days() {
        return this.v('days');
    }

    detailed_horoscope() {
        return this.v('detailed_horoscope');
    }

    error_404_info() {
        return this.v('error_404_info');
    }

    error_500_info() {
        return this.v('error_500_info');
    }

    error_description() {
        return this.v('error_description');
    }

    error() {
        return this.v('error');
    }

    events_from_country_format(_p1: { name: string }) {
        return this.v('events_from_country_format', Array.from(arguments));
    }

    events() {
        return this.v('events');
    }

    exchange_rates() {
        return this.v('exchange_rates');
    }

    exchange() {
        return this.v('exchange');
    }

    export_horoscope() {
        return this.v('export_horoscope');
    }

    forecast_no_data() {
        return this.v('forecast_no_data');
    }

    forecast_on_email_place_format(_p1: { name: string }) {
        return this.v('forecast_on_email_place_format', Array.from(arguments));
    }

    foto_video_from_event_format(_p1: { name: string }) {
        return this.v('foto_video_from_event_format', Array.from(arguments));
    }

    generate() {
        return this.v('generate');
    }

    head_back_color() {
        return this.v('head_back_color');
    }

    head_text_color() {
        return this.v('head_text_color');
    }

    heigth() {
        return this.v('heigth');
    }

    home() {
        return this.v('home');
    }

    horizontal() {
        return this.v('horizontal');
    }

    horo_api_title() {
        return this.v('horo_api_title');
    }

    horoscope_bg_app_name() {
        return this.v('horoscope_bg_app_name');
    }

    horoscope_bg_short_app_name() {
        return this.v('horoscope_bg_short_app_name');
    }

    horo_notifications_subscribe_for_sign_format(_p1: { name: string }) {
        return this.v('horo_notifications_subscribe_for_sign_format', Array.from(arguments));
    }

    horo_on_your_site_info() {
        return this.v('horo_on_your_site_info');
    }

    horo_on_your_site() {
        return this.v('horo_on_your_site');
    }

    horo_sign_daily_details_format(_p1: { sign: string; date: string }) {
        return this.v('horo_sign_daily_details_format', Array.from(arguments));
    }

    horo_sign_daily_title_format(_p1: { sign: string }) {
        return this.v('horo_sign_daily_title_format', Array.from(arguments));
    }

    horo_sign_date_format() {
        return this.v('horo_sign_date_format');
    }

    horo_sign_weekly_details_format(_p1: { sign: string; date: string }) {
        return this.v('horo_sign_weekly_details_format', Array.from(arguments));
    }

    horo_sign_weekly_title_format(_p1: { sign: string }) {
        return this.v('horo_sign_weekly_title_format', Array.from(arguments));
    }

    horoscope() {
        return this.v('horoscope');
    }

    hour() {
        return this.v('hour');
    }

    html_code() {
        return this.v('html_code');
    }

    humidity() {
        return this.v('humidity');
    }

    icon_color() {
        return this.v('icon_color');
    }

    images() {
        return this.v('images');
    }

    important_news_in_last_7days() {
        return this.v('important_news_in_last_7days');
    }

    important_news() {
        return this.v('important_news');
    }

    important() {
        return this.v('important');
    }

    in_country_bg() {
        return this.v('in_country_bg');
    }

    info() {
        return this.v('info');
    }

    international() {
        return this.v('international');
    }

    invalid_email() {
        return this.v('invalid_email');
    }

    item_color() {
        return this.v('item_color');
    }

    item_conditions() {
        return this.v('item_conditions');
    }

    item_pressure() {
        return this.v('item_pressure');
    }

    item_temperatire() {
        return this.v('item_temperatire');
    }

    item_wind_dir() {
        return this.v('item_wind_dir');
    }

    item_wind_speed_ms() {
        return this.v('item_wind_speed_ms');
    }

    item_wind_speed() {
        return this.v('item_wind_speed');
    }

    latest_events_from_country_format(_p1: { name: string }) {
        return this.v('latest_events_from_country_format', Array.from(arguments));
    }

    latest_events() {
        return this.v('latest_events');
    }

    latest_news() {
        return this.v('latest_news');
    }

    latest_quotes_in_media_country_format(_p1: { country: string }) {
        return this.v('latest_quotes_in_media_country_format', Array.from(arguments));
    }

    latest_quotes_in_media() {
        return this.v('latest_quotes_in_media');
    }

    latest_quotes() {
        return this.v('latest_quotes');
    }

    line_color() {
        return this.v('line_color');
    }

    load_more_places() {
        return this.v('load_more_places');
    }

    lucky_numbers() {
        return this.v('lucky_numbers');
    }

    max() {
        return this.v('max');
    }

    min() {
        return this.v('min');
    }

    mm() {
        return this.v('mm');
    }

    more_events() {
        return this.v('more_events');
    }

    more_quotes() {
        return this.v('more_quotes');
    }

    more() {
        return this.v('more');
    }

    most_important_news_in_last_7days_country_format(_p1: { country: string }) {
        return this.v('most_important_news_in_last_7days_country_format', Array.from(arguments));
    }

    news_bg_app_name() {
        return this.v('news_bg_app_name');
    }

    news_bg_short_app_name() {
        return this.v('news_bg_short_app_name');
    }

    news_site_description_format(_p1: { country: string }) {
        return this.v('news_site_description_format', Array.from(arguments));
    }

    news_site_title_format(_p1: { country: string }) {
        return this.v('news_site_title_format', Array.from(arguments));
    }

    news_sources() {
        return this.v('news_sources');
    }

    news_topic_description_format(_p1: { name: string }) {
        return this.v('news_topic_description_format', Array.from(arguments));
    }

    news_topic_page_title_format(_p1: { name: string }) {
        return this.v('news_topic_page_title_format', Array.from(arguments));
    }

    news() {
        return this.v('news');
    }

    no_days() {
        return this.v('no_days');
    }

    no_thanks() {
        return this.v('no_thanks');
    }

    not_found_places() {
        return this.v('not_found_places');
    }

    opinia() {
        return this.v('opinia');
    }

    photo() {
        return this.v('photo');
    }

    place() {
        return this.v('place');
    }

    places() {
        return this.v('places');
    }

    popular_news() {
        return this.v('popular_news');
    }

    popular() {
        return this.v('popular');
    }

    portal_bg_app_name() {
        return this.v('portal_bg_app_name');
    }

    portal_bg_short_app_name() {
        return this.v('portal_bg_short_app_name');
    }

    portal_site_description_format(_p1: { country: string }) {
        return this.v('portal_site_description_format', Array.from(arguments));
    }

    portal_site_title_format(_p1: { country: string }) {
        return this.v('portal_site_title_format', Array.from(arguments));
    }

    position() {
        return this.v('position');
    }

    preview() {
        return this.v('preview');
    }

    quotes_about_format(_p1: { name: string }) {
        return this.v('quotes_about_format', Array.from(arguments));
    }

    quotes_by_author_format(_p1: { name: string }) {
        return this.v('quotes_by_author_format', Array.from(arguments));
    }

    quotes() {
        return this.v('quotes');
    }

    read_more_on_source_format(_p1: { name: string }) {
        return this.v('read_more_on_source_format', Array.from(arguments));
    }

    recent_search() {
        return this.v('recent_search');
    }

    related_news() {
        return this.v('related_news');
    }

    save() {
        return this.v('save');
    }

    search_place_format(_p1: { name: string }) {
        return this.v('search_place_format', Array.from(arguments));
    }

    search_place_in_adm_cn_format(_p1: { region: string; country: string }) {
        return this.v('search_place_in_adm_cn_format', Array.from(arguments));
    }

    search_place_in_cn_format(_p1: { country: string }) {
        return this.v('search_place_in_cn_format', Array.from(arguments));
    }

    search_place() {
        return this.v('search_place');
    }

    search_result_format(_p1: { name: string }) {
        return this.v('search_result_format', Array.from(arguments));
    }

    share_on_format(_p1: { name: string }) {
        return this.v('share_on_format', Array.from(arguments));
    }

    share_with_your_friends() {
        return this.v('share_with_your_friends');
    }

    show_header() {
        return this.v('show_header');
    }

    subscribe_to_daily_notifications() {
        return this.v('subscribe_to_daily_notifications');
    }

    subscribe() {
        return this.v('subscribe');
    }

    temperature() {
        return this.v('temperature');
    }

    text_color() {
        return this.v('text_color');
    }

    today() {
        return this.v('today');
    }

    tomorrow() {
        return this.v('tomorrow');
    }

    topic_events_title_format(_p1: { name: string }) {
        return this.v('topic_events_title_format', Array.from(arguments));
    }

    topic_latest_news_format(_p1: { name: string }) {
        return this.v('topic_latest_news_format', Array.from(arguments));
    }

    topic_news_title_format(_p1: { name: string }) {
        return this.v('topic_news_title_format', Array.from(arguments));
    }

    topic_quotes_title_format(_p1: { name: string }) {
        return this.v('topic_quotes_title_format', Array.from(arguments));
    }

    total_subscribers_format(_p1: number) {
        return this.v('total_subscribers_format', Array.from(arguments));
    }

    trending() {
        return this.v('trending');
    }

    useful() {
        return this.v('useful');
    }

    vertical() {
        return this.v('vertical');
    }

    video_news() {
        return this.v('video_news');
    }

    video() {
        return this.v('video');
    }

    views() {
        return this.v('views');
    }

    weather_bg_app_name() {
        return this.v('weather_bg_app_name');
    }

    weather_bg_short_app_name() {
        return this.v('weather_bg_short_app_name');
    }

    weather_cright() {
        return this.v('weather_cright');
    }

    weather_for_10days() {
        return this.v('weather_for_10days');
    }

    weather_home_title_format(_p1: { name: string }) {
        return this.v('weather_home_title_format', Array.from(arguments));
    }

    weather_in_cn_summary_format(_p1: { country: string }) {
        return this.v('weather_in_cn_summary_format', Array.from(arguments));
    }

    weather_in_format(_p1: { name: string }) {
        return this.v('weather_in_format', Array.from(arguments));
    }

    weather_notifications_subscribe_for_place_format(_p1: { name: string }) {
        return this.v('weather_notifications_subscribe_for_place_format', Array.from(arguments));
    }

    weather_on_your_site_info_format(_p1: { country: string }) {
        return this.v('weather_on_your_site_info_format', Array.from(arguments));
    }

    weather_on_your_site() {
        return this.v('weather_on_your_site');
    }

    weather_place_description_format(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_description_format', Array.from(arguments));
    }

    weather_place_details_info_format(_p1: { name1: string; name2: string; name3: string }) {
        return this.v('weather_place_details_info_format', Array.from(arguments));
    }

    weather_place_title_format_10days_format(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_title_format_10days_format', Array.from(arguments));
    }

    weather_place_title_format(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_title_format', Array.from(arguments));
    }

    weather() {
        return this.v('weather');
    }

    weather2() {
        return this.v('weather2');
    }

    weekly_horoscope_details_format(_p1: { date: string }) {
        return this.v('weekly_horoscope_details_format', Array.from(arguments));
    }

    weekly_horoscope_details() {
        return this.v('weekly_horoscope_details');
    }

    weekly_horoscope_format(_p1: { date: string }) {
        return this.v('weekly_horoscope_format', Array.from(arguments));
    }

    weekly_horoscope() {
        return this.v('weekly_horoscope');
    }

    weather_around_the_world() {
        return this.v('weather_around_the_world');
    }

    weekly() {
        return this.v('weekly');
    }

    width() {
        return this.v('width');
    }

    love() {
        return this.v('love');
    }

    health() {
        return this.v('health');
    }

    success() {
        return this.v('success');
    }

    wind() {
        return this.v('wind');
    }

    horoscope_cz_app_name() {
        return this.v('horoscope_cz_app_name');
    }

    horoscope_cz_short_app_name() {
        return this.v('horoscope_cz_short_app_name');
    }

    in_country_cz() {
        return this.v('in_country_cz');
    }

    news_cz_app_name() {
        return this.v('news_cz_app_name');
    }

    news_cz_short_app_name() {
        return this.v('news_cz_short_app_name');
    }

    portal_cz_app_name() {
        return this.v('portal_cz_app_name');
    }

    portal_cz_short_app_name() {
        return this.v('portal_cz_short_app_name');
    }

    weather_cz_app_name() {
        return this.v('weather_cz_app_name');
    }

    weather_cz_short_app_name() {
        return this.v('weather_cz_short_app_name');
    }

    country_vn() {
        return this.v('country_vn');
    }

    country_hr() {
        return this.v('country_hr');
    }

    horoscope_in_app_name() {
        return this.v('horoscope_in_app_name');
    }

    horoscope_in_short_app_name() {
        return this.v('horoscope_in_short_app_name');
    }

    in_country_in() {
        return this.v('in_country_in');
    }

    in_country_hr() {
        return this.v('in_country_hr');
    }

    in_country_ng() {
        return this.v('in_country_ng');
    }

    news_in_app_name() {
        return this.v('news_in_app_name');
    }

    news_in_short_app_name() {
        return this.v('news_in_short_app_name');
    }

    news_sources_in_country_format(_p1: { country: string }) {
        return this.v('news_sources_in_country_format', Array.from(arguments));
    }

    add_news_source() {
        return this.v('add_news_source');
    }

    portal_in_app_name() {
        return this.v('portal_in_app_name');
    }

    portal_in_short_app_name() {
        return this.v('portal_in_short_app_name');
    }

    weather_in_app_name() {
        return this.v('weather_in_app_name');
    }

    weather_in_short_app_name() {
        return this.v('weather_in_short_app_name');
    }

    weather_hr_app_name() {
        return this.v('weather_hr_app_name');
    }

    weather_hr_short_app_name() {
        return this.v('weather_hr_short_app_name');
    }

    weather_ng_app_name() {
        return this.v('weather_ng_app_name');
    }

    weather_ng_short_app_name() {
        return this.v('weather_ng_short_app_name');
    }

    horoscope_hu_app_name() {
        return this.v('horoscope_hu_app_name');
    }

    horoscope_hu_short_app_name() {
        return this.v('horoscope_hu_short_app_name');
    }

    in_country_hu() {
        return this.v('in_country_hu');
    }

    news_hu_app_name() {
        return this.v('news_hu_app_name');
    }

    news_hu_short_app_name() {
        return this.v('news_hu_short_app_name');
    }

    portal_hu_app_name() {
        return this.v('portal_hu_app_name');
    }

    portal_hu_short_app_name() {
        return this.v('portal_hu_short_app_name');
    }

    weather_hu_app_name() {
        return this.v('weather_hu_app_name');
    }

    weather_hu_short_app_name() {
        return this.v('weather_hu_short_app_name');
    }

    horoscope_it_app_name() {
        return this.v('horoscope_it_app_name');
    }

    horoscope_it_short_app_name() {
        return this.v('horoscope_it_short_app_name');
    }

    in_country_it() {
        return this.v('in_country_it');
    }

    news_it_app_name() {
        return this.v('news_it_app_name');
    }

    news_it_short_app_name() {
        return this.v('news_it_short_app_name');
    }

    portal_it_app_name() {
        return this.v('portal_it_app_name');
    }

    portal_it_short_app_name() {
        return this.v('portal_it_short_app_name');
    }

    weather_it_app_name() {
        return this.v('weather_it_app_name');
    }

    weather_it_short_app_name() {
        return this.v('weather_it_short_app_name');
    }

    horoscope_lv_app_name() {
        return this.v('horoscope_lv_app_name');
    }

    horoscope_lv_short_app_name() {
        return this.v('horoscope_lv_short_app_name');
    }

    in_country_lv() {
        return this.v('in_country_lv');
    }

    news_lv_app_name() {
        return this.v('news_lv_app_name');
    }

    news_lv_short_app_name() {
        return this.v('news_lv_short_app_name');
    }

    portal_lv_app_name() {
        return this.v('portal_lv_app_name');
    }

    portal_lv_short_app_name() {
        return this.v('portal_lv_short_app_name');
    }

    weather_lv_app_name() {
        return this.v('weather_lv_app_name');
    }

    weather_lv_short_app_name() {
        return this.v('weather_lv_short_app_name');
    }

    horoscope_md_app_name() {
        return this.v('horoscope_md_app_name');
    }

    horoscope_md_short_app_name() {
        return this.v('horoscope_md_short_app_name');
    }

    horoscope_ro_app_name() {
        return this.v('horoscope_ro_app_name');
    }

    horoscope_ro_short_app_name() {
        return this.v('horoscope_ro_short_app_name');
    }

    in_country_md() {
        return this.v('in_country_md');
    }

    in_country_ro() {
        return this.v('in_country_ro');
    }

    news_md_app_name() {
        return this.v('news_md_app_name');
    }

    news_md_short_app_name() {
        return this.v('news_md_short_app_name');
    }

    news_ro_app_name() {
        return this.v('news_ro_app_name');
    }

    news_ro_short_app_name() {
        return this.v('news_ro_short_app_name');
    }

    portal_md_app_name() {
        return this.v('portal_md_app_name');
    }

    portal_md_short_app_name() {
        return this.v('portal_md_short_app_name');
    }

    portal_ro_app_name() {
        return this.v('portal_ro_app_name');
    }

    portal_ro_short_app_name() {
        return this.v('portal_ro_short_app_name');
    }

    weather_md_app_name() {
        return this.v('weather_md_app_name');
    }

    weather_md_short_app_name() {
        return this.v('weather_md_short_app_name');
    }

    weather_ro_app_name() {
        return this.v('weather_ro_app_name');
    }

    weather_ro_short_app_name() {
        return this.v('weather_ro_short_app_name');
    }

    horoscope_ru_app_name() {
        return this.v('horoscope_ru_app_name');
    }

    horoscope_ru_short_app_name() {
        return this.v('horoscope_ru_short_app_name');
    }

    in_country_ru() {
        return this.v('in_country_ru');
    }

    in_country_kz() {
        return this.v('in_country_kz');
    }

    news_ru_app_name() {
        return this.v('news_ru_app_name');
    }

    news_ru_short_app_name() {
        return this.v('news_ru_short_app_name');
    }

    portal_ru_app_name() {
        return this.v('portal_ru_app_name');
    }

    portal_ru_short_app_name() {
        return this.v('portal_ru_short_app_name');
    }

    weather_ru_app_name() {
        return this.v('weather_ru_app_name');
    }

    weather_ru_short_app_name() {
        return this.v('weather_ru_short_app_name');
    }

    weather_kz_app_name() {
        return this.v('weather_kz_app_name');
    }

    weather_kz_short_app_name() {
        return this.v('weather_kz_short_app_name');
    }

    in_country_al() {
        return this.v('in_country_al');
    }

    news_al_app_name() {
        return this.v('news_al_app_name');
    }

    news_al_short_app_name() {
        return this.v('news_al_short_app_name');
    }

    portal_al_app_name() {
        return this.v('portal_al_app_name');
    }

    portal_al_short_app_name() {
        return this.v('portal_al_short_app_name');
    }

    weather_al_app_name() {
        return this.v('weather_al_app_name');
    }

    weather_al_short_app_name() {
        return this.v('weather_al_short_app_name');
    }

    country_rs() {
        return this.v('country_rs');
    }

    weather_sr_app_name() {
        return this.v('weather_sr_app_name');
    }

    in_country_rs() {
        return this.v('in_country_rs');
    }

    weather_rs_app_name() {
        return this.v('weather_rs_app_name');
    }

    weather_rs_short_app_name() {
        return this.v('weather_rs_short_app_name');
    }

    in_country_tr() {
        return this.v('in_country_tr');
    }

    weather_tr_app_name() {
        return this.v('weather_tr_app_name');
    }

    weather_tr_short_app_name() {
        return this.v('weather_tr_short_app_name');
    }

    in_country_vn() {
        return this.v('in_country_vn');
    }

    weather_vn_app_name() {
        return this.v('weather_vn_app_name');
    }

    weather_vn_short_app_name() {
        return this.v('weather_vn_short_app_name');
    }
}

export type LocalesKey = '24_hrs'
    | 'accept_notifications'
    | 'ads'
    | 'back_color'
    | 'base_color'
    | 'border_color'
    | 'configuration'
    | 'contact'
    | 'count_news_format'
    | 'count_places_format'
    | 'count_views_format'
    | 'country_al'
    | 'country_bg'
    | 'country_cz'
    | 'country_hu'
    | 'country_in'
    | 'country_it'
    | 'country_md'
    | 'country_pl'
    | 'country_ro'
    | 'country_ru'
    | 'country_tr'
    | 'country_lv'
    | 'country_kz'
    | 'daily_horoscope_details_format'
    | 'daily_horoscope_details'
    | 'daily_horoscope_format'
    | 'daily_horoscope'
    | 'daily'
    | 'date_format'
    | 'day_format'
    | 'days'
    | 'detailed_horoscope'
    | 'error_404_info'
    | 'error_500_info'
    | 'error_description'
    | 'error'
    | 'events_from_country_format'
    | 'events'
    | 'exchange_rates'
    | 'exchange'
    | 'export_horoscope'
    | 'forecast_no_data'
    | 'forecast_on_email_place_format'
    | 'foto_video_from_event_format'
    | 'generate'
    | 'head_back_color'
    | 'head_text_color'
    | 'heigth'
    | 'home'
    | 'horizontal'
    | 'horo_api_title'
    | 'horoscope_bg_app_name'
    | 'horoscope_bg_short_app_name'
    | 'horo_notifications_subscribe_for_sign_format'
    | 'horo_on_your_site_info'
    | 'horo_on_your_site'
    | 'horo_sign_daily_details_format'
    | 'horo_sign_daily_title_format'
    | 'horo_sign_date_format'
    | 'horo_sign_weekly_details_format'
    | 'horo_sign_weekly_title_format'
    | 'horoscope'
    | 'hour'
    | 'html_code'
    | 'humidity'
    | 'icon_color'
    | 'images'
    | 'important_news_in_last_7days'
    | 'important_news'
    | 'important'
    | 'in_country_bg'
    | 'info'
    | 'international'
    | 'invalid_email'
    | 'item_color'
    | 'item_conditions'
    | 'item_pressure'
    | 'item_temperatire'
    | 'item_wind_dir'
    | 'item_wind_speed_ms'
    | 'item_wind_speed'
    | 'latest_events_from_country_format'
    | 'latest_events'
    | 'latest_news'
    | 'latest_quotes_in_media_country_format'
    | 'latest_quotes_in_media'
    | 'latest_quotes'
    | 'line_color'
    | 'load_more_places'
    | 'lucky_numbers'
    | 'max'
    | 'min'
    | 'mm'
    | 'more_events'
    | 'more_quotes'
    | 'more'
    | 'most_important_news_in_last_7days_country_format'
    | 'news_bg_app_name'
    | 'news_bg_short_app_name'
    | 'news_site_description_format'
    | 'news_site_title_format'
    | 'news_sources'
    | 'news_topic_description_format'
    | 'news_topic_page_title_format'
    | 'news'
    | 'no_days'
    | 'no_thanks'
    | 'not_found_places'
    | 'opinia'
    | 'photo'
    | 'place'
    | 'places'
    | 'popular_news'
    | 'popular'
    | 'portal_bg_app_name'
    | 'portal_bg_short_app_name'
    | 'portal_site_description_format'
    | 'portal_site_title_format'
    | 'position'
    | 'preview'
    | 'quotes_about_format'
    | 'quotes_by_author_format'
    | 'quotes'
    | 'read_more_on_source_format'
    | 'recent_search'
    | 'related_news'
    | 'save'
    | 'search_place_format'
    | 'search_place_in_adm_cn_format'
    | 'search_place_in_cn_format'
    | 'search_place'
    | 'search_result_format'
    | 'share_on_format'
    | 'share_with_your_friends'
    | 'show_header'
    | 'subscribe_to_daily_notifications'
    | 'subscribe'
    | 'temperature'
    | 'text_color'
    | 'today'
    | 'tomorrow'
    | 'topic_events_title_format'
    | 'topic_latest_news_format'
    | 'topic_news_title_format'
    | 'topic_quotes_title_format'
    | 'total_subscribers_format'
    | 'trending'
    | 'useful'
    | 'vertical'
    | 'video_news'
    | 'video'
    | 'views'
    | 'weather_bg_app_name'
    | 'weather_bg_short_app_name'
    | 'weather_cright'
    | 'weather_for_10days'
    | 'weather_home_title_format'
    | 'weather_in_cn_summary_format'
    | 'weather_in_format'
    | 'weather_notifications_subscribe_for_place_format'
    | 'weather_on_your_site_info_format'
    | 'weather_on_your_site'
    | 'weather_place_description_format'
    | 'weather_place_details_info_format'
    | 'weather_place_title_format_10days_format'
    | 'weather_place_title_format'
    | 'weather'
    | 'weather2'
    | 'weekly_horoscope_details_format'
    | 'weekly_horoscope_details'
    | 'weekly_horoscope_format'
    | 'weekly_horoscope'
    | 'weather_around_the_world'
    | 'weekly'
    | 'width'
    | 'love'
    | 'health'
    | 'success'
    | 'wind'
    | 'horoscope_cz_app_name'
    | 'horoscope_cz_short_app_name'
    | 'in_country_cz'
    | 'news_cz_app_name'
    | 'news_cz_short_app_name'
    | 'portal_cz_app_name'
    | 'portal_cz_short_app_name'
    | 'weather_cz_app_name'
    | 'weather_cz_short_app_name'
    | 'country_vn'
    | 'country_hr'
    | 'horoscope_in_app_name'
    | 'horoscope_in_short_app_name'
    | 'in_country_in'
    | 'in_country_hr'
    | 'in_country_ng'
    | 'news_in_app_name'
    | 'news_in_short_app_name'
    | 'news_sources_in_country_format'
    | 'add_news_source'
    | 'portal_in_app_name'
    | 'portal_in_short_app_name'
    | 'weather_in_app_name'
    | 'weather_in_short_app_name'
    | 'weather_hr_app_name'
    | 'weather_hr_short_app_name'
    | 'weather_ng_app_name'
    | 'weather_ng_short_app_name'
    | 'horoscope_hu_app_name'
    | 'horoscope_hu_short_app_name'
    | 'in_country_hu'
    | 'news_hu_app_name'
    | 'news_hu_short_app_name'
    | 'portal_hu_app_name'
    | 'portal_hu_short_app_name'
    | 'weather_hu_app_name'
    | 'weather_hu_short_app_name'
    | 'horoscope_it_app_name'
    | 'horoscope_it_short_app_name'
    | 'in_country_it'
    | 'news_it_app_name'
    | 'news_it_short_app_name'
    | 'portal_it_app_name'
    | 'portal_it_short_app_name'
    | 'weather_it_app_name'
    | 'weather_it_short_app_name'
    | 'horoscope_lv_app_name'
    | 'horoscope_lv_short_app_name'
    | 'in_country_lv'
    | 'news_lv_app_name'
    | 'news_lv_short_app_name'
    | 'portal_lv_app_name'
    | 'portal_lv_short_app_name'
    | 'weather_lv_app_name'
    | 'weather_lv_short_app_name'
    | 'horoscope_md_app_name'
    | 'horoscope_md_short_app_name'
    | 'horoscope_ro_app_name'
    | 'horoscope_ro_short_app_name'
    | 'in_country_md'
    | 'in_country_ro'
    | 'news_md_app_name'
    | 'news_md_short_app_name'
    | 'news_ro_app_name'
    | 'news_ro_short_app_name'
    | 'portal_md_app_name'
    | 'portal_md_short_app_name'
    | 'portal_ro_app_name'
    | 'portal_ro_short_app_name'
    | 'weather_md_app_name'
    | 'weather_md_short_app_name'
    | 'weather_ro_app_name'
    | 'weather_ro_short_app_name'
    | 'horoscope_ru_app_name'
    | 'horoscope_ru_short_app_name'
    | 'in_country_ru'
    | 'in_country_kz'
    | 'news_ru_app_name'
    | 'news_ru_short_app_name'
    | 'portal_ru_app_name'
    | 'portal_ru_short_app_name'
    | 'weather_ru_app_name'
    | 'weather_ru_short_app_name'
    | 'weather_kz_app_name'
    | 'weather_kz_short_app_name'
    | 'in_country_al'
    | 'news_al_app_name'
    | 'news_al_short_app_name'
    | 'portal_al_app_name'
    | 'portal_al_short_app_name'
    | 'weather_al_app_name'
    | 'weather_al_short_app_name'
    | 'country_rs'
    | 'weather_sr_app_name'
    | 'in_country_rs'
    | 'weather_rs_app_name'
    | 'weather_rs_short_app_name'
    | 'in_country_tr'
    | 'weather_tr_app_name'
    | 'weather_tr_short_app_name'
    | 'in_country_vn'
    | 'weather_vn_app_name'
    | 'weather_vn_short_app_name';
