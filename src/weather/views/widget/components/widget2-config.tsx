
import * as React from 'react';
import { WeatherViewModel } from '../../../view-models/weather-view-model';
import { WeatherLocaleNames } from '../../../locale';
import { getPlaceName } from '../../../../helpers';

export function Widget2Config({ translate, capital: place, lang }: WeatherViewModel) {

    return (
        <div>
            <table className='o-table o-table--tiny'>
                <tbody>
                    <tr>
                        <th>{translate(WeatherLocaleNames.place)}</th>
                        <td>
                            <input type='text' className='c-wconfig__place' defaultValue={getPlaceName(place, lang)} />
                            <input type='hidden' name='id' className='c-wconfig__input c-wconfig__placeid' defaultValue={place.id} />
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.days)}:</th>
                        <td>
                            <input type='number' maxLength={1} name='days' className='c-wconfig__input' defaultValue='3' max={9} min={1} />
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.base_color)}:</th>
                        <td>
                            <input type='text' maxLength={6} name='color' className='c-wconfig__input' defaultValue='68a7d4' />
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.item_color)}:</th>
                        <td>
                            <input type='text' maxLength={6} name='itemcolor' className='c-wconfig__input' placeholder='auto' />
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.text_color)}:</th>
                        <td>
                            <input type='text' maxLength={6} name='textcolor' className='c-wconfig__input' placeholder='auto' />
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.position)}:</th>
                        <td>
                            <select name='pos' className='c-wconfig__input'>
                                <option value='v' defaultChecked={true}>{translate(WeatherLocaleNames.vertical)}</option>
                                <option value='h'>{translate(WeatherLocaleNames.horizontal)}</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.width)}:</th>
                        <td>
                            <input type='number' maxLength={3} name='w' className='c-wconfig__input' defaultValue='250' max={999} min={50} />
                        </td>
                    </tr>
                    <tr>
                        <th>{translate(WeatherLocaleNames.show_header)}:</th>
                        <td>
                            <input type='checkbox' name='header' className='c-wconfig__input' defaultChecked={true} />
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <button className='c-wconfig__btn c-btn c-btn--primary c-btn--small'>{translate(WeatherLocaleNames.generate)}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
