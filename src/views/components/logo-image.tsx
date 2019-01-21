
import * as React from 'react';

export type LogoImageProps = {
    country: string
}

export function LogoImage({ country }: LogoImageProps) {

    switch (country) {
        case 'md':
            return (
                <span className={`c-logo-image v--${country}`}>
                    <span className='c-logo-image_t1'>Click</span>
                </span>
            );
        case 'ru':
            return (
                <span className={`c-logo-image v--${country}`}>
                    <span className='c-logo-image_t1'>Zborg</span>
                </span>
            );
        case 'al':
            return (
                <span className={`c-logo-image v--${country}`}>
                    <span className='c-logo-image_t1'>Moti</span>
                    <span className='c-logo-image_n'>2</span>
                </span>
            );
        case 'tr':
            return (
                <span className={`c-logo-image v--${country}`}>
                    <span className='c-logo-image_t1'>Hava</span>
                    <span className='c-logo-image_t2'>.one</span>
                </span>
            );
        case 'lv':
            return (
                <span className={`c-logo-image v--${country}`}>
                    <span className='c-logo-image_t1'>Meteo</span>
                    <span className='c-logo-image_n'>2</span>
                </span>
            );
    }

    return (
        <span className={`c-logo-image v--${country}`}>
            <span className='c-logo-image_i'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3937 3937">
                    <g>
                        <path fill="#2b363c" fillRule="nonzero" d="M668 1298c25-23 27-61 4-86L466 984c-23-25-61-27-86-4l-228 206c-25 23-27 61-4 87l206 228c23 25 62 27 86 4l229-206zM896 679c25 7 51-7 58-32l65-224c7-24-7-51-32-58l-224-65c-25-7-50 7-58 32l-65 224c-7 25 7 50 32 58l224 65zM1204 384c-4 24 12 47 36 51l221 35c24 4 47-12 51-37l36-221c3-24-13-47-37-51l-220-36c-24-4-47 13-51 37l-35 220zM1004 1334c-31 14-67 1-81-30l-127-279c-14-31-1-67 29-81l279-128c31-14 67 0 81 30l127 279c14 30 0 67-30 81l-279 127zM1018 2345c-54 26-118 2-143-51l-232-489c-25-55-3-118 51-144l490-232c54-25 118-2 143 51l232 490c26 54 3 118-51 143l-490 232z" />
                        <path fill="#ca0000" fillRule="nonzero" d="M2978 788c-494-269-1069-245-1527 9l339 724c235-154 544-177 808-34 382 208 523 688 315 1069-208 382-688 523-1069 315-187-102-316-269-375-458l-216 101c-16 9-33 16-50 23l-459 214c130 338 376 633 718 819 768 418 1732 133 2150-635s133-1732-635-2149z" />
                    </g>
                </svg>
            </span>
            <span className='c-logo-image_t2'>ur</span>
            <span className='c-logo-image_t1'>net</span>
        </span>
    );
}
