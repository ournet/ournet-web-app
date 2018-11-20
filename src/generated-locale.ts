
import { Provider, Translator, ProviderOptions, DirectoryProviderOptions, parseDirectory } from 'lang-text';

export class TranslatorProvider<T extends GeneratedTranslator = GeneratedTranslator> {
    private provider: Provider
    private translators: { [lang: string]: T } = {}

    constructor(options: ProviderOptions, private createTranslator?: (t: Translator) => T) {
        this.provider = new Provider(options);
    }

    translator(lang: string) {
        if (!this.translators[lang]) {
            if (this.createTranslator) {
                this.translators[lang] = this.createTranslator(this.provider.translator(lang));
            } else {
                this.translators[lang] = new GeneratedTranslator(this.provider.translator(lang)) as T;
            }
        }

        return this.translators[lang];
    }

    static createFromDirectory(options: DirectoryProviderOptions) {
        const { directory, defaultLanguage, throwUndefinedKey, languages } = options;

        const data = parseDirectory({ directory, languages });

        return new TranslatorProvider({
            defaultLanguage,
            throwUndefinedKey,
            data,
        })
    }
}

export class GeneratedTranslator {
    private __translator: Translator
    constructor(translator: Translator) {
        this.__translator = translator;
    }

    s(key: TranslatorKey, ...args: any[]) {
        return this.v(key, args);
    }

    v(key: TranslatorKey, args?: any[]) {
        return this.__translator.t(key, args);
    }
    

    $24_hrs() {
        return this.v('24_hrs', Array.from(arguments));
    }

    accept_notifications() {
        return this.v('accept_notifications', Array.from(arguments));
    }

    ads() {
        return this.v('ads', Array.from(arguments));
    }

    back_color() {
        return this.v('back_color', Array.from(arguments));
    }

    base_color() {
        return this.v('base_color', Array.from(arguments));
    }

    border_color() {
        return this.v('border_color', Array.from(arguments));
    }

    configuration() {
        return this.v('configuration', Array.from(arguments));
    }

    contact() {
        return this.v('contact', Array.from(arguments));
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

    daily_horoscope_details_format(_p1: { name: string }) {
        return this.v('daily_horoscope_details_format', Array.from(arguments));
    }

    daily_horoscope_details() {
        return this.v('daily_horoscope_details', Array.from(arguments));
    }

    daily_horoscope_format(_p1: { name: string }) {
        return this.v('daily_horoscope_format', Array.from(arguments));
    }

    daily_horoscope() {
        return this.v('daily_horoscope', Array.from(arguments));
    }

    daily() {
        return this.v('daily', Array.from(arguments));
    }

    date_format() {
        return this.v('date_format', Array.from(arguments));
    }

    day_format() {
        return this.v('day_format', Array.from(arguments));
    }

    days() {
        return this.v('days', Array.from(arguments));
    }

    detailed_horoscope() {
        return this.v('detailed_horoscope', Array.from(arguments));
    }

    error_404_info() {
        return this.v('error_404_info', Array.from(arguments));
    }

    error_500_info() {
        return this.v('error_500_info', Array.from(arguments));
    }

    error_description() {
        return this.v('error_description', Array.from(arguments));
    }

    error() {
        return this.v('error', Array.from(arguments));
    }

    events_from_country_format(_p1: { name: string }) {
        return this.v('events_from_country_format', Array.from(arguments));
    }

    events() {
        return this.v('events', Array.from(arguments));
    }

    exchange_rates() {
        return this.v('exchange_rates', Array.from(arguments));
    }

    exchange() {
        return this.v('exchange', Array.from(arguments));
    }

    export_horoscope() {
        return this.v('export_horoscope', Array.from(arguments));
    }

    forecast_no_data() {
        return this.v('forecast_no_data', Array.from(arguments));
    }

    forecast_on_email_place_format(_p1: { name: string }) {
        return this.v('forecast_on_email_place_format', Array.from(arguments));
    }

    foto_video_from_event_format(_p1: { name: string }) {
        return this.v('foto_video_from_event_format', Array.from(arguments));
    }

    generate() {
        return this.v('generate', Array.from(arguments));
    }

    head_back_color() {
        return this.v('head_back_color', Array.from(arguments));
    }

    head_text_color() {
        return this.v('head_text_color', Array.from(arguments));
    }

    heigth() {
        return this.v('heigth', Array.from(arguments));
    }

    home() {
        return this.v('home', Array.from(arguments));
    }

    horizontal() {
        return this.v('horizontal', Array.from(arguments));
    }

    horo_app_name() {
        return this.v('horo_app_name', Array.from(arguments));
    }

    horo_notifications_subscribe_for_sign_format(_p1: { name: string }) {
        return this.v('horo_notifications_subscribe_for_sign_format', Array.from(arguments));
    }

    horo_short_app_name() {
        return this.v('horo_short_app_name', Array.from(arguments));
    }

    horo_sign_daily_details_format(_p1: { sign: string; date: string }) {
        return this.v('horo_sign_daily_details_format', Array.from(arguments));
    }

    horo_sign_daily_title_format(_p1: { sign: string }) {
        return this.v('horo_sign_daily_title_format', Array.from(arguments));
    }

    horo_sign_date_format() {
        return this.v('horo_sign_date_format', Array.from(arguments));
    }

    horo_sign_weekly_details_format(_p1: { sign: string; date: string }) {
        return this.v('horo_sign_weekly_details_format', Array.from(arguments));
    }

    horo_sign_weekly_title_format(_p1: { sign: string }) {
        return this.v('horo_sign_weekly_title_format', Array.from(arguments));
    }

    horo_api_body_format() {
        return this.v('horo_api_body_format', Array.from(arguments));
    }

    horo_api_subtitle_format(_p1: { name: string }) {
        return this.v('horo_api_subtitle_format', Array.from(arguments));
    }

    horo_api_title() {
        return this.v('horo_api_title', Array.from(arguments));
    }

    horo_on_your_site_info() {
        return this.v('horo_on_your_site_info', Array.from(arguments));
    }

    horo_on_your_site() {
        return this.v('horo_on_your_site', Array.from(arguments));
    }

    horoscope() {
        return this.v('horoscope', Array.from(arguments));
    }

    hour() {
        return this.v('hour', Array.from(arguments));
    }

    html_code() {
        return this.v('html_code', Array.from(arguments));
    }

    humidity() {
        return this.v('humidity', Array.from(arguments));
    }

    icon_color() {
        return this.v('icon_color', Array.from(arguments));
    }

    images() {
        return this.v('images', Array.from(arguments));
    }

    important_news_in_last_7days() {
        return this.v('important_news_in_last_7days', Array.from(arguments));
    }

    important_news() {
        return this.v('important_news', Array.from(arguments));
    }

    important() {
        return this.v('important', Array.from(arguments));
    }

    in_country_md() {
        return this.v('in_country_md', Array.from(arguments));
    }

    in_country_ro() {
        return this.v('in_country_ro', Array.from(arguments));
    }

    info() {
        return this.v('info', Array.from(arguments));
    }

    international() {
        return this.v('international', Array.from(arguments));
    }

    invalid_email() {
        return this.v('invalid_email', Array.from(arguments));
    }

    item_color() {
        return this.v('item_color', Array.from(arguments));
    }

    item_conditions() {
        return this.v('item_conditions', Array.from(arguments));
    }

    item_pressure() {
        return this.v('item_pressure', Array.from(arguments));
    }

    item_temperatire() {
        return this.v('item_temperatire', Array.from(arguments));
    }

    item_wind_dir() {
        return this.v('item_wind_dir', Array.from(arguments));
    }

    item_wind_speed_ms() {
        return this.v('item_wind_speed_ms', Array.from(arguments));
    }

    item_wind_speed() {
        return this.v('item_wind_speed', Array.from(arguments));
    }

    latest_events_from_country_format(_p1: { name: string }) {
        return this.v('latest_events_from_country_format', Array.from(arguments));
    }

    latest_events() {
        return this.v('latest_events', Array.from(arguments));
    }

    latest_news() {
        return this.v('latest_news', Array.from(arguments));
    }

    latest_quotes_in_media_country_format(_p1: { country: string }) {
        return this.v('latest_quotes_in_media_country_format', Array.from(arguments));
    }

    latest_quotes_in_media() {
        return this.v('latest_quotes_in_media', Array.from(arguments));
    }

    latest_quotes() {
        return this.v('latest_quotes', Array.from(arguments));
    }

    line_color() {
        return this.v('line_color', Array.from(arguments));
    }

    load_more_places() {
        return this.v('load_more_places', Array.from(arguments));
    }

    lucky_numbers() {
        return this.v('lucky_numbers', Array.from(arguments));
    }

    max() {
        return this.v('max', Array.from(arguments));
    }

    min() {
        return this.v('min', Array.from(arguments));
    }

    mm() {
        return this.v('mm', Array.from(arguments));
    }

    more_events() {
        return this.v('more_events', Array.from(arguments));
    }

    more_quotes() {
        return this.v('more_quotes', Array.from(arguments));
    }

    more() {
        return this.v('more', Array.from(arguments));
    }

    most_important_news_in_last_7days_country_format(_p1: { country: string }) {
        return this.v('most_important_news_in_last_7days_country_format', Array.from(arguments));
    }

    news_app_name() {
        return this.v('news_app_name', Array.from(arguments));
    }

    news_short_app_name() {
        return this.v('news_short_app_name', Array.from(arguments));
    }

    news_site_description_format(_p1: { country: string }) {
        return this.v('news_site_description_format', Array.from(arguments));
    }

    news_site_title_format(_p1: { country: string }) {
        return this.v('news_site_title_format', Array.from(arguments));
    }

    news_sources() {
        return this.v('news_sources', Array.from(arguments));
    }

    news_topic_description_format(_p1: { name: string }) {
        return this.v('news_topic_description_format', Array.from(arguments));
    }

    news_topic_title_format(_p1: { name: string }) {
        return this.v('news_topic_title_format', Array.from(arguments));
    }

    news() {
        return this.v('news', Array.from(arguments));
    }

    no_days() {
        return this.v('no_days', Array.from(arguments));
    }

    no_thanks() {
        return this.v('no_thanks', Array.from(arguments));
    }

    not_found_places() {
        return this.v('not_found_places', Array.from(arguments));
    }

    opinia() {
        return this.v('opinia', Array.from(arguments));
    }

    photo() {
        return this.v('photo', Array.from(arguments));
    }

    place() {
        return this.v('place', Array.from(arguments));
    }

    places() {
        return this.v('places', Array.from(arguments));
    }

    popular_news() {
        return this.v('popular_news', Array.from(arguments));
    }

    popular() {
        return this.v('popular', Array.from(arguments));
    }

    portal_app_name() {
        return this.v('portal_app_name', Array.from(arguments));
    }

    portal_short_app_name() {
        return this.v('portal_short_app_name', Array.from(arguments));
    }

    position() {
        return this.v('position', Array.from(arguments));
    }

    preview() {
        return this.v('preview', Array.from(arguments));
    }

    quotes_about_format(_p1: { name: string }) {
        return this.v('quotes_about_format', Array.from(arguments));
    }

    quotes_by_author_format(_p1: { name: string }) {
        return this.v('quotes_by_author_format', Array.from(arguments));
    }

    quotes() {
        return this.v('quotes', Array.from(arguments));
    }

    read_more_on_source_format(_p1: { name: string }) {
        return this.v('read_more_on_source_format', Array.from(arguments));
    }

    recent_search() {
        return this.v('recent_search', Array.from(arguments));
    }

    related_news() {
        return this.v('related_news', Array.from(arguments));
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
        return this.v('search_place', Array.from(arguments));
    }

    search_result_format(_p1: { name: string }) {
        return this.v('search_result_format', Array.from(arguments));
    }

    share_on_format(_p1: { name: string }) {
        return this.v('share_on_format', Array.from(arguments));
    }

    share_with_your_friends() {
        return this.v('share_with_your_friends', Array.from(arguments));
    }

    show_header() {
        return this.v('show_header', Array.from(arguments));
    }

    subscribe_to_daily_notifications() {
        return this.v('subscribe_to_daily_notifications', Array.from(arguments));
    }

    subscribe() {
        return this.v('subscribe', Array.from(arguments));
    }

    temperature() {
        return this.v('temperature', Array.from(arguments));
    }

    text_color() {
        return this.v('text_color', Array.from(arguments));
    }

    today() {
        return this.v('today', Array.from(arguments));
    }

    tomorrow() {
        return this.v('tomorrow', Array.from(arguments));
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
        return this.v('trending', Array.from(arguments));
    }

    useful() {
        return this.v('useful', Array.from(arguments));
    }

    vertical() {
        return this.v('vertical', Array.from(arguments));
    }

    video_news() {
        return this.v('video_news', Array.from(arguments));
    }

    video() {
        return this.v('video', Array.from(arguments));
    }

    views() {
        return this.v('views', Array.from(arguments));
    }

    weather_app_name() {
        return this.v('weather_app_name', Array.from(arguments));
    }

    weather_cright() {
        return this.v('weather_cright', Array.from(arguments));
    }

    weather_for_10days() {
        return this.v('weather_for_10days', Array.from(arguments));
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
        return this.v('weather_on_your_site', Array.from(arguments));
    }

    weather_place_description_format(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_description_format', Array.from(arguments));
    }

    weather_place_details_info(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_details_info', Array.from(arguments));
    }

    weather_place_title_format_10days_format(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_title_format_10days_format', Array.from(arguments));
    }

    weather_place_title_format(_p1: { name1: string; name2: string }) {
        return this.v('weather_place_title_format', Array.from(arguments));
    }

    weather_short_app_name() {
        return this.v('weather_short_app_name', Array.from(arguments));
    }

    weather() {
        return this.v('weather', Array.from(arguments));
    }

    weather2() {
        return this.v('weather2', Array.from(arguments));
    }

    weekly_horoscope_details_format(_p1: { date: string }) {
        return this.v('weekly_horoscope_details_format', Array.from(arguments));
    }

    weekly_horoscope_details() {
        return this.v('weekly_horoscope_details', Array.from(arguments));
    }

    weekly_horoscope_format(_p1: { date: string }) {
        return this.v('weekly_horoscope_format', Array.from(arguments));
    }

    weekly_horoscope() {
        return this.v('weekly_horoscope', Array.from(arguments));
    }

    weekly() {
        return this.v('weekly', Array.from(arguments));
    }

    width() {
        return this.v('width', Array.from(arguments));
    }

    wind() {
        return this.v('wind', Array.from(arguments));
    }
}

export type TranslatorKey = '24_hrs'
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
    | 'horo_app_name'
    | 'horo_notifications_subscribe_for_sign_format'
    | 'horo_short_app_name'
    | 'horo_sign_daily_details_format'
    | 'horo_sign_daily_title_format'
    | 'horo_sign_date_format'
    | 'horo_sign_weekly_details_format'
    | 'horo_sign_weekly_title_format'
    | 'horo_api_body_format'
    | 'horo_api_subtitle_format'
    | 'horo_api_title'
    | 'horo_on_your_site_info'
    | 'horo_on_your_site'
    | 'horoscope'
    | 'hour'
    | 'html_code'
    | 'humidity'
    | 'icon_color'
    | 'images'
    | 'important_news_in_last_7days'
    | 'important_news'
    | 'important'
    | 'in_country_md'
    | 'in_country_ro'
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
    | 'news_app_name'
    | 'news_short_app_name'
    | 'news_site_description_format'
    | 'news_site_title_format'
    | 'news_sources'
    | 'news_topic_description_format'
    | 'news_topic_title_format'
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
    | 'portal_app_name'
    | 'portal_short_app_name'
    | 'position'
    | 'preview'
    | 'quotes_about_format'
    | 'quotes_by_author_format'
    | 'quotes'
    | 'read_more_on_source_format'
    | 'recent_search'
    | 'related_news'
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
    | 'weather_app_name'
    | 'weather_cright'
    | 'weather_for_10days'
    | 'weather_home_title_format'
    | 'weather_in_cn_summary_format'
    | 'weather_in_format'
    | 'weather_notifications_subscribe_for_place_format'
    | 'weather_on_your_site_info_format'
    | 'weather_on_your_site'
    | 'weather_place_description_format'
    | 'weather_place_details_info'
    | 'weather_place_title_format_10days_format'
    | 'weather_place_title_format'
    | 'weather_short_app_name'
    | 'weather'
    | 'weather2'
    | 'weekly_horoscope_details_format'
    | 'weekly_horoscope_details'
    | 'weekly_horoscope_format'
    | 'weekly_horoscope'
    | 'weekly'
    | 'width'
    | 'wind';
