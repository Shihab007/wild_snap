package com.wildSnap.apis.Util.image;

import java.lang.reflect.Type;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class GsonDateTimeUtil implements JsonSerializer<DateTime>, JsonDeserializer<DateTime> {

    private DateTimeFormatter dateFormat = DateTimeFormat.forPattern(ImageUploadConstants.DATE_FORMAT);

    @Override
    public JsonElement serialize(DateTime src, Type typeOfSrc, JsonSerializationContext context) {
        return new JsonPrimitive(dateFormat.print(src));
    }

    @Override
    public DateTime deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context) throws JsonParseException {
        if (json.getAsString() == null || json.getAsString().isEmpty()) {
            return null;
        }
        return dateFormat.parseDateTime(json.getAsString());
    }

}
