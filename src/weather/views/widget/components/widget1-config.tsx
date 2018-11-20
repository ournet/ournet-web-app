
import * as React from 'react';
import { WeatherViewModel } from '../../../view-models/weather-view-model';
import { getPlaceName } from '../../../../helpers';

export function Widget1Config({ locales, capital: place, lang }: WeatherViewModel) {

    return (
        <div>
            <table className='o-table o-table--tiny'>
                <tbody>
                    <tr>
                        <th>{locales.place()}</th>
                        <td>
                            <input type='text' className='c-wconfig__place' defaultValue={getPlaceName(place, lang)} />
                            <input type='hidden' name='id' className='c-wconfig__input c-wconfig__placeid' defaultValue={place.id} />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.days()}:</th>
                        <td>
                            <input type='number' maxLength={1} name='days' className='c-wconfig__input' defaultValue='5' max={9} min={1} />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.text_color()}:</th>
                        <td>
                            <input type='text' maxLength={6} name='textcolor' className='c-wconfig__input' placeholder='848484' />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.border_color()}:</th>
                        <td>
                            <input type='text' maxLength={6} name='bcolor' className='c-wconfig__input' placeholder='CA0000' />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.back_color()}:</th>
                        <td>
                            <input type='text' maxLength={6} name='bkcolor' className='c-wconfig__input' placeholder='FFF' />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.head_back_color()}:</th>
                        <td>
                            <input type='text' maxLength={6} name='hbkcolor' className='c-wconfig__input' placeholder='CA0000' />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.head_text_color()}:</th>
                        <td>
                            <input type='text' maxLength={6} name='htcolor' className='c-wconfig__input' placeholder='FFF' />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.line_color()}:</th>
                        <td>
                            <input type='text' maxLength={6} name='lcolor' className='c-wconfig__input' placeholder='DDD' />
                        </td>
                    </tr>
                    <tr>
                        <th>{locales.width()}:</th>
                        <td>
                            <input type='number' maxLength={3} name='w' className='c-wconfig__input' defaultValue='200' max={999} min={50} />
                        </td>
                    </tr>
                    <tr>
                        <th></th>
                        <td>
                            <button className='c-wconfig__btn c-btn c-btn--primary c-btn--small'>{locales.generate()}</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
