import { PropTypes } from 'react';
import Component from '../Component';
import { connect } from 'react-redux';
import Dropdown from 'react-toolbox/lib/dropdown';
import { changeLanguage } from '../state/user';
import languages from '../i18n/languages.json';
import translate from '../i18n/Translate';
import flags from '../i18n/flags';
import { getCurrentLanguage } from '../selectors';

const stateToProps = state => ({
    currentLanguage: getCurrentLanguage(state)
});

const actionsToProps = dispatch => ({
    changeLanguage: lang => dispatch(changeLanguage(lang))
});

@translate('LanguagePicker')
@connect(stateToProps, actionsToProps)
class LanguagePicker extends Component {
    render() {
        return (
            <Dropdown
                auto
                source={languages}
                label={this.props.strings.header}
                template={this.renderItem}
                value={this.props.currentLanguage}
                onChange={this.props.changeLanguage}
            />
        );
    }

    renderItem(item) {
        const containerStyle = {
            display: 'flex',
            flexDirection: 'row'
        };

        const imageStyle = {
            display: 'flex',
            width: '32px',
            height: '32px',
            flexGrow: 0,
            marginRight: '8px'
        };

        const contentStyle = {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 2
        };

        return (
            <div style={containerStyle}>
                <img src={flags[item.value]} style={imageStyle}/>
                <div style={contentStyle}>
                    <strong>{item.name}</strong>
                    <small>{item.englishName}</small>
                </div>
            </div>
        );
    }
}

LanguagePicker.propTypes = {
    strings: PropTypes.object
};

LanguagePicker.defaultProps = {
    strings: {
        header: 'Choose a language'
    }
}

export default LanguagePicker;
