import { default as React } from 'react';
import en from './en';
import fr from './fr';
import hu from './hu';
import ptbr from './pt-br';
import nl from './nl';

const languages = { en, fr, hu, ptbr, nl };

export default function translate(key) {
    return Component => {
        class TranslationComponent extends React.Component {

            render() {
                var strings = languages[this.context.currentLanguage][key];
                const merged = {
                    ...this.props.strings,
                    ...strings
                }
                if (strings) {
                    return <Component {...this.props} strings={merged} currentLanguage={this.context.currentLanguage} />;
                } else {
                    return <Component {...this.props} currentLanguage={this.context.currentLanguage} />;
                }

            }
        }

        TranslationComponent.contextTypes = {
            currentLanguage: React.PropTypes.string
        };

        return TranslationComponent;
    };
}
