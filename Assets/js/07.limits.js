// Limits field.
Mautic.contactclientLimits = function () {
    var $limits = mQuery('#contactclient_limits');
    if (typeof window.contactclientLimitsLoaded === 'undefined' && $limits.length) {

        window.contactclientLimitsLoaded = true;

        var limitsJSONEditor;

        // Grab the JSON Schema to begin rendering the form with JSONEditor.
        mQuery.ajax({
            dataType: 'json',
            cache: true,
            url: mauticBasePath + '/' + mauticAssetPrefix + 'plugins/MauticContactClientBundle/Assets/json/limits.json',
            success: function (data) {
                var schema = data;

                // Create our widget container for the JSON Editor.
                var $limitsJSONEditor = mQuery('<div>', {
                    class: 'contactclient_jsoneditor'
                }).insertBefore($limits);

                // Instantiate the JSON Editor based on our schema.
                limitsJSONEditor = new JSONEditor($limitsJSONEditor[0], {
                    schema: schema,
                    disable_collapse: true
                });

                $limits.change(function () {
                    // Load the initial value if applicable.
                    var raw = mQuery(this).val(),
                        obj;
                    if (raw.length) {
                        try {
                            obj = mQuery.parseJSON(raw);
                            if (typeof obj === 'object') {
                                limitsJSONEditor.setValue(obj);
                            }
                        }
                        catch (e) {
                            console.warn(e);
                        }
                    }
                }).trigger('change');

                // Persist the value to the JSON Editor.
                limitsJSONEditor.on('change', function () {
                    var obj = limitsJSONEditor.getValue();
                    if (typeof obj === 'object') {
                        var raw = JSON.stringify(obj, null, '  ');
                        if (raw.length) {
                            // Set the textarea.
                            $limits.val(raw);
                        }
                    }
                });

                $limits.addClass('hide');
                $limitsJSONEditor.show();
                // mQuery('label[for=contactclient_limits]').addClass('hide');
            }
        });

    }
};